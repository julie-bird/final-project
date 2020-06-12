import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  apiKeyHike: string = '200792556-481bb23f6f36faf871c6cc7118c51171';
  apiKeyGeocoding: string = "AIzaSyBggV5pQiJQ-M_n4frMX_JpMVxHsjsSVuo";
  apiUrlHike: string = "https://www.hikingproject.com/data/get-trails";
  apiUrlGeocoding: string = "https://maps.googleapis.com/maps/api/geocode/json";
  birdAPI: string = "https://api.ebird.org/v2/data/obs/geo/recent";
  birdAPIKey: string = "tn01p81100sf";
  weatherAPI: string = "ffa70af12adabe155d075948d06a9b14";
  weatherLatLong: string = "https://api.openweathermap.org/data/2.5/weather";
  imagesAPIKey: string = "17012923-f8b2d7b5bfcad45724d0424c4";
  imagesURL: string = "https://pixabay.com/api/";
  soundsURL: string = "http://localhost:3000/sound";



  getLocationLatLong(lat, long): any {
    return this.http.get(this.apiUrlHike, {
      params: {
        lat: lat,
        lon: long,
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
        maxResults: "20"
      }
    });
  }

  getWeather(lat: any, long: any): any {
    return this.http.get(this.weatherLatLong, {
      params: { appid: this.weatherAPI, lat: lat, lon: long }
    });
  }

  getImages(search: string): any {
    return this.http.get(this.imagesURL, {
      params: { key: this.imagesAPIKey, q: search }
    });
  }

  getSounds(sound: string): any {
        return this.http.get(this.soundsURL, {
      params: { query: sound }
    });
  }
}
