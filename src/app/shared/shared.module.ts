import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizontalSnakeGraphComponent } from './components/horizontal-snake-graph/horizontal-snake-graph.component';
import { DependencyWheelChartComponent } from './components/dependency-wheel-chart/dependency-wheel-chart.component';
import { ZoneSelectorComponent } from './zone-selector/zone-selector.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [HorizontalSnakeGraphComponent, DependencyWheelChartComponent, ZoneSelectorComponent],
  exports: [HorizontalSnakeGraphComponent, DependencyWheelChartComponent, ZoneSelectorComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule
  ]
})
export class SharedModule { }
