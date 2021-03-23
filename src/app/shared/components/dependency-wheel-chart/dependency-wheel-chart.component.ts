import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import { ChordSubgroup, DefaultArcObject } from 'd3';

export interface ChordsData {
  source: string;
  target: string;
  value: number;
}

@Component({
  selector: 'sm-dependency-wheel-chart',
  templateUrl: './dependency-wheel-chart.component.html',
  styleUrls: ['./dependency-wheel-chart.component.scss']
})
export class DependencyWheelChartComponent implements OnInit {
  @Input()
  data: ChordsData[] = [];

  @Input()
  names: string[] = [];

  @Input()
  colors: d3.ScaleOrdinal<string, string, never>;

  @Input()
  hoveredChord: ChordsData;

  @Input()
  hoveredGroup: string;

  matrix: number[][];
  width = 900;
  height = this.width;
  innerRadius = Math.min(this.width, this.height) * 0.5 - 20;
  outerRadius = this.innerRadius + 20;
  ribbon = d3.ribbon()
    .radius(this.innerRadius - 15)
    .padAngle(1 / this.innerRadius);
  arc = d3.arc()
    .innerRadius(this.innerRadius)
    .outerRadius(this.outerRadius)
  chord = d3.chordDirected()
    .padAngle(0.04)
    .sortSubgroups(d3.ascending)
    .sortChords(d3.descending)
  formatValue = x => `${x.toFixed(0)}B`;
  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;

  ngOnInit(): void {  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && this.data) {
      this.updateChart();
    }
    if (changes.names && this.names) {
      this.updateChart();
    }
    if (changes.hoveredChord) {
      this.handleChordHover(this.hoveredChord);
    }
    if (changes.hoveredGroup) {
      this.handleGroupHover(this.hoveredGroup);
    }
  }

  private updateChart() {
    if (this.svg) {
      d3.select('svg').remove();
    }
    this.svg = this.createSvg();
    this.createChart();
    this.matrix = this.getMatrix();
    this.createChords();
    this.createCircle();
  }

  private createSvg() {
    const svg = d3.select('figure#chart')
      .append('svg')
      .attr('viewBox', `${-this.width / 2} ${-this.height / 2} ${this.width} ${this.height}`);
    return svg;
  }

  private createChart() {
    this.svg.append('path')
      .attr('id', 'wheel-chart')
      .attr('fill', 'rgb(0,0,0,0.2)')
      .attr('d', d3.arc()({outerRadius: this.outerRadius, startAngle: 0, endAngle: 2 * Math.PI} as DefaultArcObject));
  }

  private createChords() {
    const grads = this.svg.append('defs')
      .selectAll('linearGradient')
      .data(this.getChordData())
      .enter()
      .append('linearGradient')
      .attr('id', d => this.getGradientId(d))
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', d => this.innerRadius * Math.cos((d.source.endAngle-d.source.startAngle) / 2 + d.source.startAngle - Math.PI/2))
      .attr('y1', d => this.innerRadius * Math.sin((d.source.endAngle-d.source.startAngle) / 2 + d.source.startAngle - Math.PI/2))
      .attr('x2', d => this.innerRadius * Math.cos((d.target.endAngle-d.target.startAngle) / 2 + d.target.startAngle - Math.PI/2))
      .attr('y2', d => this.innerRadius * Math.sin((d.target.endAngle-d.target.startAngle)));

      grads.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', d => this.colors(this.names[d.source.index]));

      grads.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', d => this.colors(this.names[d.target.index]));

    this.svg.append('g')
      .selectAll('g')
      .data(this.getChordData())
      .join('path')
        .classed('chord', true)
        .attr('d', <any>this.ribbon)
        .attr('fill-opacity', 0.3)
        .style('fill', d => `url(#${this.getGradientId(d)})`)
        .style('mix-blend-mode', 'lighten')
      .on('mouseover', this.onChordMouseEvent(true))
      .on('mouseout', this.onChordMouseEvent(false))
  }

  private createCircle() {
    this.svg.append('g')
      .attr('fill-opacity', 0.3)
      .selectAll('g')
      .data(this.getChordGroupData())
      .join('g')
        .call(g => g.append('path')
          .classed('arc', true)
          .attr('d', <any>this.arc)
          .attr('fill', d => this.colors(this.names[d.index]))
      ).on('mouseover', this.onArcMouseEvent(true))
      .on('mouseout', this.onArcMouseEvent(false));
  }

  private getMatrix() {
    const existedNames = [...new Set([...this.data.map(d => d.source), ...this.data.map(d => d.target)])];
    const index = new Map(existedNames.map((name, i) => [name, i]));
    const matrix = Array.from(index, () => new Array(existedNames.length).fill(0));
    for (const d of this.data) {
      const sourceIndex = index.get(d.source);
      const targetIndex = index.get(d.target);
      if (sourceIndex !== undefined && targetIndex != undefined) {
        matrix[sourceIndex][targetIndex] += d.value;
      }
    }
    return matrix;
  }

  private getChordData() {
    return this.chord(this.matrix);
  }

  private getChordGroupData() {
    return this.getChordData().groups;
  }

  private onChordMouseEvent(isOver: boolean) {
    return (mouseEvent: any, data: any) => {
      d3.selectAll('.arc')
        .filter((d: ChordSubgroup) => d.index === data.source.index || d.index === data.target.index)
        .attr('fill-opacity', this.getOpacity(isOver))
      d3.select(mouseEvent.srcElement)
        .attr('fill-opacity', this.getOpacity(isOver))
    }
  }

  private onArcMouseEvent(isOver: boolean) {
    return (mouseEvent: any, _data: any) => {
      d3.select(mouseEvent.srcElement)
        .attr('fill-opacity', this.getOpacity(isOver))
    }
  }


  private handleGroupHover(hoveredGroup: string) {
    d3.selectAll('.arc')
      .attr('fill-opacity', this.getOpacity(false));
    d3.selectAll('.arc')
      .filter((d: ChordSubgroup) => this.groupFilter(d, hoveredGroup))
      .attr('fill-opacity', this.getOpacity(true));
  }

  private handleChordHover(hoveredChord: ChordsData) {
    d3.selectAll('.arc')
      .attr('fill-opacity', this.getOpacity(false));
    d3.selectAll('.arc')
      .filter((d: ChordSubgroup) => this.chordFilter(d, hoveredChord))
      .attr('fill-opacity', this.getOpacity(true));
  }

  private groupFilter(d: ChordSubgroup, group: string) {
    return group && (d.index === this.names.indexOf(group));
  }

  private chordFilter(d: ChordSubgroup, chord: ChordsData) {
    return chord && (d.index === this.names.indexOf(chord.source)
          || d.index === this.names.indexOf(chord.target));
  }

  private getOpacity(isOver: boolean) {
    return isOver ? 1 : 0.3;
  }

  private getGradientId(d: any) { return 'linkGrad-' + d.source.index + '-' + d.target.index; }
}
