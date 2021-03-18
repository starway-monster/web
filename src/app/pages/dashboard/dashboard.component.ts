import { Component } from '@angular/core';
import * as d3 from 'd3';
import { ChordsData } from 'src/app/shared/components/dependency-wheel-chart/dependency-wheel-chart.component';

@Component({
  selector: 'sm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  zonesPath = ['Zone1','Zone2','Zone3','Zone4', 'Zone5','Zone6','Zone7','Zone8'];
  colors = d3.scaleOrdinal(this.zonesPath, d3.schemeCategory10);
  colorsArr = this.zonesPath.map(name => this.colors(name));
  zoneDependencies: ChordsData[] = [
    {source:'Zone1', target:'Zone2', value:1},
    {source:'Zone2', target:'Zone3', value:1},
    {source:'Zone3', target:'Zone4', value:1},
    {source:'Zone4', target:'Zone5', value:1},
    {source:'Zone5', target:'Zone6', value:1},
    {source:'Zone6', target:'Zone7', value:1},
    {source:'Zone7', target:'Zone8',value:1}
  ];
}
