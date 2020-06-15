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

  constructor(private service: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }



  getLocationAddress(form: NgForm) {
    this.address = form.value.address;
    this.service.getLocationAddress(this.address).subscribe((response) => {
      let lat = response.results[0].geometry.location.lat
      let long = response.results[0].geometry.location.lng

      this.service.getLocationLatLong(lat, long).subscribe((response) => {
        this.trails = response.trails;
        this.trails.forEach(trail => {
          let trailLat = trail.latitude;
          let trailLon = trail.longitude;
          this.service.getWeather(trailLat, trailLon).subscribe((response) => {
            trail.weather = response
          });
          this.service.getBirdData(trailLat, trailLon).subscribe(res => {
            // this.birdData = res;
            trail.trailBirds = res;
            console.log(res)
            trail.trailBirds.forEach((birdObj) => {
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
                  console.log(birdObj.sound)
                }
              })
            })
          });
        })
      })

    })
  }
}
