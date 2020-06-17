import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trail-overview',
  templateUrl: './trail-overview.component.html',
  styleUrls: ['./trail-overview.component.css']
})
export class TrailOverviewComponent implements OnInit {
  pickedTrail: any = {}

  constructor(private service: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(response => {
      console.log(response)
    })
  }

}
