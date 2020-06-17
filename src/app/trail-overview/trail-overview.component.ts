import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trail-overview',
  templateUrl: './trail-overview.component.html',
  styleUrls: ['./trail-overview.component.css']
})
export class TrailOverviewComponent implements OnInit {
  pickedTrail: any;
  constructor(private service: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(response1 => {

      this.service.getTrailsById(response1.trailid).subscribe(response2 => {
        console.log(response2.trails[0].latitude)
        let trailLat = response2.trails[0].latitude;
        let trailLon = response2.trails[0].longitude;
        this.service.getWeather(trailLat, trailLon).subscribe((response3) => {
          response2.trails[0].weather = response3
        });

        this.service.getBirdData(trailLat, trailLon).subscribe(res => {
          response2.trails[0].trailBirds = res;
          response2.trails[0].trailBirds.forEach((birdObj) => {
            let bird = birdObj.comName
            this.service.getImages(bird).subscribe(response4 => {
              if (response4.hits.length > 2) {
                birdObj.img1 = response4.hits[0].largeImageURL;
                birdObj.img2 = response4.hits[1].largeImageURL;
                birdObj.img3 = response4.hits[2].largeImageURL;
              }
            });

            this.service.getSounds(bird).subscribe(response5 => {
              if (response5.recordings.length >= 1) {
                birdObj.sound = response5.recordings[0]["file"];
              }
            })
          })
        });
        // console.log(response2)
        this.pickedTrail = response2.trails[0]
        console.log(this.pickedTrail)
      })

    })
  }






}
