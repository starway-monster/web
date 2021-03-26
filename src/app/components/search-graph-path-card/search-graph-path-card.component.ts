import { ZoneService } from 'src/app/api/services/zone.service';
import { ChangeDetectionStrategy, Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChordsData } from 'src/app/shared/components/dependency-wheel-chart/dependency-wheel-chart.component';
import { catchError, finalize, takeLast } from 'rxjs/operators';
import { of } from 'rxjs';
import { IBestPathsDetails } from 'src/app/api/models/zone.model';

@Component({
  selector: 'sm-search-graph-path-card',
  templateUrl: './search-graph-path-card.component.html',
  styleUrls: ['./search-graph-path-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchGraphPathCardComponent implements OnInit {

  @Input()
  colors;

  @Input()
  zoneNames: string[] = [];

  selectedFromZone: string;
  selectedToZone: string;
  excludedZones: string[];
  initialState = true;
  zonesBestPath: IBestPathsDetails = undefined;

  constructor(private readonly zonesService: ZoneService,
    private readonly changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  onSearch() {
    this.zonesService.getPath(this.selectedFromZone, this.selectedToZone, this.excludedZones)
      .pipe(
        takeLast(1),
        catchError(err => {
          return of(undefined);
        }),
        finalize(() => {
          this.initialState = false;
          this.changeDetectorRef.detectChanges()
        })
      ).subscribe(result => {
        this.zonesBestPath = result;
      });
  }

}
