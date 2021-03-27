import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ChordsData } from 'src/app/shared/components/dependency-wheel-chart/dependency-wheel-chart.component';

@Component({
  selector: 'sm-dependency-graph-card',
  templateUrl: './dependency-graph-card.component.html',
  styleUrls: ['./dependency-graph-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DependencyGraphCardComponent implements OnInit {

  @Input()
  colors;

  @Input()
  zoneDependencies: ChordsData[] = [];

  @Input()
  zoneNames: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
