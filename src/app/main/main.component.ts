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
        console.log(this.trails)

        this.service.getBirdData(lat, long).subscribe(res => {
          console.log("birds", res)
          this.birdData = res;
          this.birdData.forEach((birdObj) => {
            let bird = birdObj.comName
            this.service.getImages(bird).subscribe(res => {
              birdObj.img1 = res.hits[0].largeImageURL
              birdObj.img2 = res.hits[1].largeImageURL
              birdObj.img3 = res.hits[2].largeImageURL
              console.log(res.hits[0].largeImageURL)
            })
          })
          console.log(this.birdData[0])
        });
        this.service.getWeather(lat, long).subscribe((response) => {
          console.log(response)
          this.weatherData = response
        })

      })

    })
  }
}
