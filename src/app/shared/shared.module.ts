import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizontalSnakeGraphComponent } from './components/horizontal-snake-graph/horizontal-snake-graph.component';
import { DependencyWheelChartComponent } from './components/dependency-wheel-chart/dependency-wheel-chart.component';
import { ZoneSelectorComponent } from './zone-selector/zone-selector.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from './components/card/card.component';



@NgModule({
  declarations: [HorizontalSnakeGraphComponent, DependencyWheelChartComponent, ZoneSelectorComponent, CardComponent],
  exports: [HorizontalSnakeGraphComponent, DependencyWheelChartComponent, ZoneSelectorComponent, CardComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule
  ]
})
export class SharedModule { }
