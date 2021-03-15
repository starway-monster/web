import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from 'src/app/layouts/main-layout/main-layout.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: DashboardComponent
    }
  ])],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

