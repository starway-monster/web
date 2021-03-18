import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizontalSnakeGraphComponent } from './components/horizontal-snake-graph/horizontal-snake-graph.component';
import { DependencyWheelChartComponent } from './components/dependency-wheel-chart/dependency-wheel-chart.component';



@NgModule({
  declarations: [HorizontalSnakeGraphComponent, DependencyWheelChartComponent],
  exports: [HorizontalSnakeGraphComponent, DependencyWheelChartComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
