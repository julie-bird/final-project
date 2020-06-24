import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  pickedTrail: any = {};
  spottedList: any = [];
  constructor(private http: HttpClient) { }
  apiKeyHike: string = '200792556-481bb23f6f36faf871c6cc7118c51171';
  apiKeyGeocoding: string = "AIzaSyA1D73WmT9GhjzVFdj_s7v2XEJ-W_I6bI0";
  apiUrlHike: string = "https://www.hikingproject.com/data/get-trails";
  apiUrlGeocoding: string = "https://maps.googleapis.com/maps/api/geocode/json";
  birdAPI: string = "https://api.ebird.org/v2/data/obs/geo/recent";
  birdAPIKey: string = "tn01p81100sf";
  weatherAPI: string = "ffa70af12adabe155d075948d06a9b14";
  weatherLatLong: string = "https://api.openweathermap.org/data/2.5/weather";
  imagesAPIKey: string = "17012923-f8b2d7b5bfcad45724d0424c4";
  imagesURL: string = "https://pixabay.com/api/";
  soundsURL: string = environment.apiBaseUrl;
  getTrailIdURL: string = "https://www.hikingproject.com/data/get-trails-by-id"


  getTrails(lat, long): any {
    return this.http.get(this.apiUrlHike, {
      params: {
        lat: lat,
        lon: long,
        key: this.apiKeyHike
      },
    });
  };

  getTrailsById(id): any {
    return this.http.get(this.getTrailIdURL, {
      params: {
        ids: id,
        key: this.apiKeyHike
      },
    });
  };


  getLocationAddress(address): any {
    return this.http.get(this.apiUrlGeocoding, {
      params: {
        address: address,
        key: this.apiKeyGeocoding
      },
    });
  };

  getBirdData(lat: string, long: string): any {
    return this.http.get(this.birdAPI, {
      headers: {
        'X-eBirdApiToken': this.birdAPIKey,
      },
      params: {
        lat: lat,
        lng: long,
        maxResults: "5"
      }
    });
  }

  getWeather(lat: any, long: any): any {
    return this.http.get(this.weatherLatLong, {
      params: { appid: this.weatherAPI, lat: lat, lon: long, units: "Imperial" }
    });
  }

  getImages(search: string): any {
    return this.http.get(this.imagesURL, {
      params: { key: this.imagesAPIKey, q: search, image_type: "photo", safesearch: "true", category: "nature" }
    });
  }

  getSounds(sound: string): any {
    return this.http.get(`${this.soundsURL}/sound`, {
      params: { query: sound }
    });
  }

  pushSpotted(bird: any): void {
    this.spottedList.push(bird);
    console.log(this.spottedList)
  }

  removeSpotted(index: number): void {
    this.spottedList.splice(index, 1);
  }
  getSpotted(): any {
    return this.spottedList
  }

  setTrail(trail): any {
    this.pickedTrail = trail;
    console.log(this.pickedTrail)
  }

  getTrail(): any {
    return this.pickedTrail
  }
}
