import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import * as d3 from 'd3';
import { ReplaySubject, Subscription } from 'rxjs';
import { takeLast, takeUntil } from 'rxjs/operators';
import { IDependenciesResult, IZonesResult } from 'src/app/api/models/zone.model';
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
  selectedFromZone: string;
  selectedToZone: string;
  excludedZones: string[];
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private readonly zonesService: ZoneService,
    private readonly changeDetectorRef: ChangeDetectorRef) {  }

  ngOnInit() {
    this.zonesService.getAllZones()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result: ApolloQueryResult<IZonesResult>) => {
        this.zonesPath = result?.data?.zones.map(z => z.name) ?? [];
        this.changeDetectorRef.detectChanges();
      });

    this.zonesService.getAllDependencies()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result: ApolloQueryResult<IDependenciesResult>) => {
        this.zoneDependencies = result?.data?.edge
          ?.map(edge => ({ source: edge.zone1, target: edge.zone2, value: 1 } as ChordsData))
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onSearch() {
    this.zonesService.getPath(this.selectedFromZone, this.selectedToZone, this.excludedZones)
      .pipe(takeLast(1))
      .subscribe(r => console.log(r));
  }
}

