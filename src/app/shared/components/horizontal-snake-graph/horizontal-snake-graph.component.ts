import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

export interface IGraphItem {
  value: string;
  isLastInRow: boolean;
  horizontalArrowHidden: boolean;
}

export interface IGraphItemGroup {
  items: IGraphItem[];
  isLastRow: boolean;
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
    let nestedArr = [];
    let lastRowIndex = Math.floor((data.length - 1) / n);
    for (let i = 0; i < data.length; i++) {
      const rowIndex = Math.floor(i / n);
      const colIndex = Math.floor(i % n);
      const isReverseRow = rowIndex % 2 === 1;
      const isLastInRow = colIndex === n - 1 || i === data.length - 1;
      nestedArr.push({
        value: data[i],
        isLastInRow,
        horizontalArrowHidden: !isReverseRow && nestedArr.length === 0
          || isReverseRow && isLastInRow
      });
      if (isLastInRow) {
        const undefinedCount = n - nestedArr.length;
        nestedArr = [...nestedArr, ...Array(undefinedCount).fill({
          value: undefined,
          isLastInRow: true,
          horizontalArrowHidden: true
        })];
        newArr.push({
          items: nestedArr,
          isLastRow: rowIndex === lastRowIndex,
          isReverseRow
        });
        nestedArr = [];
      }
    }
    return newArr;
  }

  getColor(value: string) {
    return `${this.colors(value)}4D`;
  }

  generateNewItems(isDataChanged: boolean): void {
    const itemsInRow = this.calculateItemsInRow();
    if (itemsInRow !== this.itemsInRow || isDataChanged) {
      this.itemsInRow = itemsInRow;
      this.graphItemGroups = this.generateGraphItems(this.data, this.itemsInRow);
      this.changeDetectiorRef.detectChanges();
    }
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
