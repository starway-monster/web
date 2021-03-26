import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnChanges, SimpleChanges, ViewChild, Output, EventEmitter } from '@angular/core';

export interface IGraphItem {
  value: string;
}

export interface IGraphItemGroup {
  items: IGraphItem[];
  isReverseRow: boolean;
}

@Component({
  selector: 'sm-horizontal-snake-graph',
  templateUrl: './horizontal-snake-graph.component.html',
  styleUrls: ['./horizontal-snake-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HorizontalSnakeGraphComponent implements OnChanges {

  @Input()
  data: string[];

  @Input()
  colors: d3.ScaleOrdinal<string, string, never>;

  @Output()
  hoveredItemChanged = new EventEmitter<string>();


  @ViewChild('graphContainer')
  graph: ElementRef;

  @HostListener('window:resize', ['$event.target'])
  onResize() {
    this.generateNewItems(false);
  }

  itemsInRow = 3;

  graphItemGroups: IGraphItemGroup[];

  private initialWidth = 600;
  private stepWidthSize = 240;

  constructor(private readonly changeDetectiorRef: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && this.data) {
      this.generateNewItems(true);
    }
  }

  generateGraphItems(data: string[], n: number): IGraphItemGroup[] {
    let newArr: IGraphItemGroup[] = [];
    let nestedArr: IGraphItem[] = [];
    for (let i = 0; i < data.length; i++) {
      const rowIndex = Math.floor(i / n);
      const colIndex = Math.floor(i % n);
      const isReverseRow = rowIndex % 2 === 1;
      const isLastInRow = colIndex === n - 1 || i === data.length - 1;
      nestedArr.push({ value: data[i] } as IGraphItem);
      if (isLastInRow) {
        newArr.push({
          items: nestedArr,
          isReverseRow
        } as IGraphItemGroup);
        nestedArr = [];
      }
    }
    return newArr;
  }

  generateNewItems(isDataChanged: boolean): void {
    const itemsInRow = this.calculateItemsInRow();
    if (itemsInRow !== this.itemsInRow || isDataChanged) {
      this.itemsInRow = itemsInRow;
      this.graphItemGroups = this.generateGraphItems(this.data, this.itemsInRow);
      this.changeDetectiorRef.detectChanges();
    }
  }

  hoverItem(zoneName: string) {
    this.hoveredItemChanged.next(zoneName);
  }

  private calculateItemsInRow(): number {
    const width = this.graph?.nativeElement?.clientWidth;
    let itemsInRow = 4;
    if (width !== undefined) {
      if (width < this.initialWidth) {
        itemsInRow = 2;
      } else if (width < this.initialWidth + this.stepWidthSize) {
        itemsInRow = 3;
      }
    }
    return itemsInRow;
  }
}
