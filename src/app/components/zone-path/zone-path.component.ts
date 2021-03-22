import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
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
export class ZonePathComponent {

  @Input()
  zonesPath = [];

  @Input()
  colors;

  selectedPathType: PathType = PathType.byFee;

  pathTypes = PathType;
}
