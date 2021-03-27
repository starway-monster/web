import { ZoneEventsHandlerService } from './../../shared/services/zone-events-handler.service';
import { IBestPathsDetails, IDetailedPathInformation } from './../../api/models/zone.model';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { HorizontalSnakeGraphComponent } from 'src/app/shared/components/horizontal-snake-graph/horizontal-snake-graph.component';

export enum PathType {
  byFee = 'byFee',
  byTransfersCount = 'byTransfersCount'
}

@Component({
  selector: 'sm-zone-path',
  templateUrl: './zone-path.component.html',
  styleUrls: ['./zone-path.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZonePathComponent implements OnChanges {

  @Input()
  bestPathsDetails: IBestPathsDetails;

  @Input()
  colors;

  pathTypes = PathType;

  selectedPathType: PathType = PathType.byTransfersCount;

  selectedPath: IDetailedPathInformation;

  graphPath: string[];

  hoveredItems$ = this.zoneEventsHandlerService.hoveredZones$;

  constructor(
    private readonly zoneEventsHandlerService: ZoneEventsHandlerService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.bestPathsDetails) {
      this.onSelectedPathTypeChanged(PathType.byTransfersCount)
    }
  }

  onSelectedPathTypeChanged(type: PathType) {
    this.selectedPathType = type;
    this.selectedPath = type === PathType.byFee
      ? this.bestPathsDetails.pathByFee
      : this.bestPathsDetails.pathByTransfers;
    this.graphPath = this.selectedPath.graph.reduce((prev, curr, index) => {
      if (index === 0) {
        prev.push(curr.fromZone);
      }
      prev.push(curr.toZone);
      return prev;
    }, []);
    this.changeDetectorRef.detectChanges();
  }

  hoveredItemChanged(itemName: string[]) {
    this.zoneEventsHandlerService.setHoveredZones(...itemName);
  }
}
