import { Component, Input } from '@angular/core';

export enum PathType {
  byFee = 'byFee',
  byTransfersCount = 'byTransfersCount'
}

@Component({
  selector: 'sm-zone-path',
  templateUrl: './zone-path.component.html',
  styleUrls: ['./zone-path.component.scss']
})
export class ZonePathComponent {

  @Input()
  zonesPath = [];

  @Input()
  colors;

  selectedPathType: PathType = PathType.byFee;

  pathTypes = PathType;
}
