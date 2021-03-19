import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import * as d3 from 'd3';
import { Subscription } from 'rxjs';
import { IZonesResult } from 'src/app/api/models/zone.model';
import { ZoneService } from 'src/app/api/services/zone.service';
import { ChordsData } from 'src/app/shared/components/dependency-wheel-chart/dependency-wheel-chart.component';

@Component({
  selector: 'sm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  zonesPath = [];
  colors = d3.scaleOrdinal(this.zonesPath, d3.schemeCategory10);
  colorsArr = this.zonesPath.map(name => this.colors(name));
  zoneDependencies: ChordsData[] = [
    {source:'irishub-1', target:'okwme', value:1},
    {source:'okwme', target:'cosmoshub-4', value:1},
    {source:'cosmoshub-4', target:'swap-testnet-2001', value:1},
    {source:'swap-testnet-2001', target:'musselnet-3', value:1},

  ];
  querySubstription: Subscription;

  constructor(private readonly zonesService: ZoneService,
    private readonly changeDetectorRef: ChangeDetectorRef) {  }

  ngOnInit() {
    this.querySubstription = this.zonesService.getAllZones()
      .subscribe((result: ApolloQueryResult<IZonesResult>) => {
        this.zonesPath = result?.data?.zones.map(z => z.name) ?? [];
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.querySubstription.unsubscribe();
  }
}

