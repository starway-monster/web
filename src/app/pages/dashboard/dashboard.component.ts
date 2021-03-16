import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  zonesPath = ['Zone1','Zone2','Zone3','Zone4', 'Zone5','Zone6','Zone7','Zone8'];

  constructor() { }

  ngOnInit(): void {
  }

}
