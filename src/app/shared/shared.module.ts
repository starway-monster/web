import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizontalSnakeGraphComponent } from './components/horizontal-snake-graph/horizontal-snake-graph.component';



@NgModule({
  declarations: [HorizontalSnakeGraphComponent],
  exports: [HorizontalSnakeGraphComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
