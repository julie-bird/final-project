import { Component, OnInit, HostListener, Inject, ViewChildren } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { element } from 'protractor';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChildren("card") cards: any;
  // @ViewChild("test") cards: any;
  day1: any;
  day2: any;
  day3: any;
  day4: any;
  day5: any;
  data: any;
  trails: any = [];
  address: any = undefined;
  birdData: any = [];
  weatherData: any = [];
  imageData: any = [];
  newArray: any = [];
  birdIndex: number = null;
  birdPicUrl: string = null;
  weatherIndex: number = null;
  trailIndex: number = null;
  forecastIndex: number = null;
  trailButtonClicked: boolean = false;
  weatherButtonClicked: boolean = false;
  birdButtonClicked: boolean = false;
  forecastButtonClicked: boolean = false;
  trailImgArray = ["/assets/hike1.jpg", "/assets/hike2.jpg", "/assets/hike3.jpg", "/assets/hike4.jpg", "/assets/hike5.jpg", "/assets/default-trail.jpg"]

  constructor(private service: ApiService, private router: Router, private route: ActivatedRoute, @Inject(DOCUMENT) document) { }

  ngOnInit(): void {
    this.newArray = this.service.getSpotted();
    // console.log(this.newArray)

    this.route.queryParams.subscribe((response) => {
      if (response.location) {
        this.service.getLocationAddress(response.location).subscribe((response) => {
          let lat = response.results[0].geometry.location.lat
          let long = response.results[0].geometry.location.lng
          this.service.getTrails(lat, long).subscribe((response) => {
            this.trails = response.trails;
            console.log(lat, long)
            // console.log(this.cards._results)
          })
        })
      }
    })
  }

  // ngAfterViewInit() {
  //   // this.scrollToElement();
  //   console.log(this.cards)
  //   this.cards.changes.subscribe(response => {
  //     console.log(response.first.nativeElement)
  //     response.first.nativeElement.scrollIntoView({ behavior: "smooth", block: "center", })
  //   })
  //   // console.log(this.cards._results)

  // }

  scrollToElement(): void {
    // console.log(this.cards);
    // console.log(this.cards._results[0])
    // this.cards._results[0].nativeElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    // .scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

  }


  getLocationAndTrails(form: NgForm) {
    this.address = form.value.address;
    this.service.getLocationAddress(this.address).subscribe((response) => {
      let lat = response.results[0].geometry.location.lat
      let long = response.results[0].geometry.location.lng
      this.service.getTrails(lat, long).subscribe((response) => {
        this.trails = response.trails;
      })
      this.router.navigate(["home"], { queryParams: { location: this.address } })
      // $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

    })
  };

  choosePic(): string {
    let randomNum = Math.floor((Math.random() * this.trailImgArray.length));
    return this.trailImgArray[randomNum];
  }

  // Weather Methods

  seeWeatherInfo(index: number) {
    this.weatherIndex = index;
    this.getTrailWeather(index);
    this.weatherButtonClicked = true;
    this.birdIndex = null;
    this.trailIndex = null;
    this.birdButtonClicked = false;
    this.trailButtonClicked = false;
  }

  hideWeatherInfo() {
    this.weatherIndex = null;
    this.weatherButtonClicked = false;
  }

  getTrailWeather(index: number) {
    let trailLat = this.trails[index].latitude;
    let trailLon = this.trails[index].longitude;
    this.service.getWeather(trailLat, trailLon).subscribe((response) => {
      this.trails[index].weather = response
      console.log(this.trails[index].weather)
    });
    this.birdIndex = null;
  };

  getFutureForecast(index: number) {
    // this.forecastIndex=index;
    let trailLat = this.trails[index].latitude;
    let trailLon = this.trails[index].longitude;
    this.service.getFutureForecast(trailLat, trailLon).subscribe((response) => {
      this.trails[index].forecast = response
      console.log(this.trails[index].forecast)

      this.day1 = response.list[0]
      this.day2 = response.list[8]
      this.day3 = response.list[16]
      this.day4 = response.list[24]
      this.day5 = response.list[32]
      // console.log(response.list[0], response.list[8], response.list[16], response.list[24], response.list[32])
    });
    this.birdIndex = null;
  };

  seeFutureForecast(index: number) {
    this.forecastIndex = index;
    this.getFutureForecast(index);
    this.forecastButtonClicked = true;
    this.birdIndex = null;
    this.trailIndex = null;
    this.birdButtonClicked = false;
    this.trailButtonClicked = false;
  }

  // Bird Methods

  seeBirdInfo(index: number) {
    this.birdIndex = index;
    this.getBirdData(index);
    this.weatherIndex = null;
    this.trailIndex = null;
    this.birdButtonClicked = true;
    this.weatherButtonClicked = false;
    this.trailButtonClicked = false;
  }

  hideBirdInfo() {
    this.birdIndex = null;
    this.birdButtonClicked = false;
  }

  seeBirdPic(pic: string) {
    this.birdPicUrl = pic;
  }

  hideBirdPic() {
    this.birdPicUrl = null;
  }

  getBirdData(index: number) {
    let trailLat = this.trails[index].latitude;
    let trailLon = this.trails[index].longitude;
    this.service.getBirdData(trailLat, trailLon).subscribe(res => {
      this.trails[index].trailBirds = res;
      console.log(this.trails[index].trailBirds)
      this.trails[index].trailBirds.forEach((birdObj) => {
        console.log(birdObj)
        let bird = birdObj.comName
        this.service.getImages(bird).subscribe(res => {
          if (res.hits.length > 0) {
            birdObj.img1 = res.hits[0].largeImageURL;
            birdObj.img2 = res.hits[1].largeImageURL;
            birdObj.img3 = res.hits[2].largeImageURL;
          }
        });
        this.service.getSounds(bird).subscribe(res => {
          if (res.recordings.length >= 1) {
            birdObj.sound = res.recordings[0]["file"];
          }
        })
        this.newArray.forEach((object) => {
          if (object.comName === bird) {
            birdObj.addSpotted = true;
            console.log(object)
          }
        })
      })
    });
    // console.log(this.trails)
  }

  // Spotted List Methods

  checkSpottedList(bird: any): boolean {
    return this.newArray.some((listItem) => {
      return listItem.comName === bird.comName;
    })
  }

  addSpotted(bird: any): void {
    let index = null;
    if (this.newArray.length === 0) {
      bird.isClicked = true;
      this.service.pushSpotted(bird)
      bird.addSpotted = true;
    } else {
      index = this.newArray.findIndex((birdIndex) => {
        return birdIndex.comName === bird.comName;
      });
      if (this.checkSpottedList(bird)) {
        this.service.removeSpotted(index)
        bird.isClicked = false;
      } else {
        bird.isClicked = true;
        this.service.pushSpotted(bird)
        bird.addSpotted = true;
      }
    };
    console.log(bird)
  }

  seeTrailStats(index) {
    this.trailIndex = index;
    this.birdIndex = null;
    this.weatherIndex = null;
    this.trailButtonClicked = true;
    this.birdButtonClicked = false;
    this.weatherButtonClicked = false;
  }

  hideTrailStats() {
    this.trailIndex = null;
    this.trailButtonClicked = false;
  }

  trailOverviewPath(name: string, id: number, location: string) {
    this.router.navigate(["trail-overview"], { queryParams: { trailname: name, trailid: id, location: location } })
  }




}
