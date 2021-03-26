import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ZonePathComponent } from './zone-path/zone-path.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DependencyGraphCardComponent } from './dependency-graph-card/dependency-graph-card.component';
import { SearchGraphPathCardComponent } from './search-graph-path-card/search-graph-path-card.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, ZonePathComponent, DependencyGraphCardComponent, SearchGraphPathCardComponent],
  exports: [NavbarComponent, FooterComponent, ZonePathComponent, DependencyGraphCardComponent, SearchGraphPathCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatButtonToggleModule,
    FormsModule
  ]
})
export class ComponentsModule { }
