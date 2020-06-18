import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  data: any;
  trails: any = [];
  address: any = undefined;
  birdData: any = [];
  weatherData: any = [];
  imageData: any = [];
  newArray: any = [];
  birdIndex: number = null;
  weatherIndex: number = null;

  constructor(private service: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.newArray = this.service.getSpotted();
  }



  getLocationAndTrails(form: NgForm) {
    this.address = form.value.address;
    this.service.getLocationAddress(this.address).subscribe((response) => {
      let lat = response.results[0].geometry.location.lat
      let long = response.results[0].geometry.location.lng

      this.service.getTrails(lat, long).subscribe((response) => {
        console.log(response)
        this.trails = response.trails;
      })
      this.router.navigate(["home"], { queryParams: { location: this.address } })
    })
  };

  // Weather Methods

  seeWeatherInfo(index: number) {
    this.weatherIndex = index;
    this.getTrailWeather(index)
  }

  hideWeatherInfo() {
    this.weatherIndex = null;
  }

  getTrailWeather(index: number) {
    let trailLat = this.trails[index].latitude;
    let trailLon = this.trails[index].longitude;
    this.service.getWeather(trailLat, trailLon).subscribe((response) => {
      this.trails[index].weather = response
    });
  };

  // Bird Methods

  seeBirdInfo(index: number) {
    this.birdIndex = index;
    this.getBirdData(index)
  }

  hideBirdInfo() {
    this.birdIndex = null;
  }

  getBirdData(index: number) {
    let trailLat = this.trails[index].latitude;
    let trailLon = this.trails[index].longitude;
    this.service.getBirdData(trailLat, trailLon).subscribe(res => {
      this.trails[index].trailBirds = res;
      this.trails[index].trailBirds.forEach((birdObj) => {
        let bird = birdObj.comName
        this.service.getImages(bird).subscribe(res => {
          if (res.hits.length > 2) {
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
      })
    });
    console.log(this.trails)
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
  }

  seeTrailStats(trail: any) {
    trail.statsShown = true;
    trail.button = true
    console.log(trail)
  }

  hideTrailStats(trail: any) {
    trail.statsShown = false;
    trail.button = false
  }

  trailOverviewPath(name: string, id: number) {
    this.router.navigate(["trail-overview"], { queryParams: { trailname: name, trailid: id } })
  }
}
