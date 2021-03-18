import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

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
  styleUrls: ['./horizontal-snake-graph.component.scss']
})
export class HorizontalSnakeGraphComponent implements OnChanges {

  @Input()
  data: string[];

  @Input()
  colors: d3.ScaleOrdinal<string, string, never>;

  itemsInRow = 3;

  graphItemGroups: IGraphItemGroup[];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && this.data) {
      this.graphItemGroups = this.generateGraphItems(this.data, this.itemsInRow);
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
}
