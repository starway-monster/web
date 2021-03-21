import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ZonePathComponent } from './zone-path/zone-path.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, ZonePathComponent],
  exports: [NavbarComponent, FooterComponent, ZonePathComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatButtonToggleModule,
    FormsModule
  ]
})
export class ComponentsModule { }
