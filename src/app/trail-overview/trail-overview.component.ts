import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trail-overview',
  templateUrl: './trail-overview.component.html',
  styleUrls: ['./trail-overview.component.css']
})
export class TrailOverviewComponent implements OnInit {
  pickedTrail: any;
  spottedArray: any = [];
  birdPicUrl: string = "";
  constructor(private service: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.spottedArray = this.service.getSpotted();
    this.route.queryParams.subscribe(response1 => {

      this.service.getTrailsById(response1.trailid).subscribe(response2 => {
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
        this.pickedTrail = response2.trails[0]
      })

    })
  }

  // Spotted List Methods

  checkSpottedList(bird: any): boolean {
    return this.spottedArray.some((listItem) => {
      return listItem.comName === bird.comName;
    })
  }

  addSpotted(bird: any): void {
    let index = null;
    if (this.spottedArray.length === 0) {
      bird.isClicked = true;
      this.service.pushSpotted(bird)
      bird.addSpotted = true;
    } else {
      index = this.spottedArray.findIndex((birdIndex) => {
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

  seeBirdPic(pic: string) {
    this.birdPicUrl = pic;
  }

  hideBirdPic() {
    this.birdPicUrl = null;
  }


}
