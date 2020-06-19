import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-spotted',
  templateUrl: './spotted.component.html',
  styleUrls: ['./spotted.component.css']
})
export class SpottedComponent implements OnInit {
  spottedList: any = [];
  prevScrollpos = window.pageYOffset;

  constructor(private service: ApiService) { }

  ngOnInit(): void {
    this.spottedList = this.service.getSpotted()
  }
  removeBird(index: number): void {
    this.service.removeSpotted(index);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    let currentScrollPos = window.pageYOffset;
    if (this.prevScrollpos > currentScrollPos) {
      document.getElementById("navbar").style.top = "0";
    } else {
      document.getElementById("navbar").style.top = "-100px";
    }
    this.prevScrollpos = currentScrollPos;
  }
}
