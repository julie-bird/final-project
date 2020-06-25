import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-spotted',
  templateUrl: './spotted.component.html',
  styleUrls: ['./spotted.component.css']
})
export class SpottedComponent implements OnInit {
  spottedList: any = ["empty"];

  constructor(private service: ApiService) { }

  ngOnInit(): void {
    this.spottedList = this.service.getSpotted()
  }
  removeBird(index: number): void {
    this.service.removeSpotted(index);
  }



}
