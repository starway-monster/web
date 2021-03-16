import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChunkPipe } from './pipes/chunk.pipe';



@NgModule({
  declarations: [ChunkPipe],
  exports: [ChunkPipe],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
