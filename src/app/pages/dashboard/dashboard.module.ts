import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatButtonModule} from '@angular/material/button';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule,
    SharedModule,
    ComponentsModule
  ]
})
export class DashboardModule { }
