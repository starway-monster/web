import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [MainLayoutComponent],
  exports: [MainLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ComponentsModule
  ]
})
export class LayoutsModule { }
