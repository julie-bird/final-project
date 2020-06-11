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
}
