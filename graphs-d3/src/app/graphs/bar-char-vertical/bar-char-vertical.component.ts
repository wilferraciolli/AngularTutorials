import { AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild } from '@angular/core';

import * as d3 from 'd3';
import {ScaleBand} from 'd3';

@Component({
    selector: 'app-bar-char-vertical',
    templateUrl: './bar-char-vertical.component.html',
    styleUrls: ['./bar-char-vertical.component.scss'],
    standalone: false
})
export class BarCharVerticalComponent implements AfterViewInit, OnChanges {
  @Input() data!: { name: string, series: { name: string, value: number }[] }[];
  @Input() height = 300;
  @Input() margin = {top: 10, left: 50, right: 10, bottom: 20};
  @Input() innerPadding = 0.1;
  @Input() outerPadding = 0.1;
  @Input() seriesInnerPadding = 0.1;
  @Input() domain = [0, 1000];
  @Input() barColors = ['#00aeef', '#f98e2b', '#7C77AD'];

  public svg!: d3.Selection<SVGGElement, unknown, null, undefined>;
  public isRendered = false;

  @ViewChild('svgContainer', {read: ElementRef, static: true}) svgContainerRef!: ElementRef<HTMLDivElement>;

  constructor() {
  }

  @HostListener('window:resize')
  onResize() {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isRendered) {
      this.createChart();
    }
  }

  ngAfterViewInit(): void {
    this.createChart();
    this.isRendered = true;
  }

  private createSVG(): void {
    this.svg = d3.select(this.svgContainerRef.nativeElement)
      .append('svg')
      .attr('width', '100%')
      .attr('height', this.height)
      .append('g')
      .attr('width', '100%')
      .attr('transform', 'translate(0, 0)')
      .attr('class', 'bar-chart-vertical');
  }

  private isDataValid(): boolean {
    return this.data && this.data.length > 0;
  }

  private getBandScale(domain: string[], range: any, innerPadding = 0, outerPadding = 0) {
    const scale: any | ScaleBand<string> = d3.scaleBand()
      .range(range)
      .domain(domain)
      .paddingInner(innerPadding)
      .paddingOuter(outerPadding);
    scale.type = 'BAND';
    return scale;
  }

  private createChart(): void {
    if (!this.isRendered) {
      this.createSVG();
    }
    if (this.isDataValid()) {
      const margin = {
        top: this.margin.top,
        right: this.margin.right,
        bottom: this.margin.bottom,
        left: this.margin.left,
      }

      let height = this.height - margin.top - margin.bottom;
      const width = this.svgContainerRef.nativeElement.getBoundingClientRect().width - margin.left - margin.right;
      const groupNames = this.data.map(item => item.name);
      const groupLabels = this.data.length > 0 ? this.data[0].series.map(item => item.name) : [];

      const xScale = this.getBandScale(groupNames, [0, width], this.innerPadding, this.outerPadding).round(true);
      const x1Scale = this.getBandScale(groupLabels, [0, xScale.bandwidth()], this.seriesInnerPadding, this.outerPadding).round(true);

      let chartContainer = this.svg.selectAll<SVGGElement, number>('g.chart-container').data([1]);
      chartContainer = chartContainer.enter()
        .append('g')
        .attr('class', 'chart-container')
        .merge(chartContainer)
        .attr('transform', `translate(${margin.left}, ${margin.right})`);

      let chartWrap = chartContainer.selectAll<SVGGElement, number>('g.chart-wrap').data([1]);
      chartWrap = chartWrap.enter()
        .append('g')
        .attr('class', 'chart-wrap')
        .merge(chartWrap)
        .attr('transform', 'translate(0, 0)');

      const xAxis = chartWrap.selectAll<SVGGElement, number>('g.x-axis').data([1]);
      xAxis.enter()
        .append('g')
        .attr('class', 'x-axis')
        .merge(xAxis)
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale)).selectAll('text')
        .style('text-anchor', 'middle');

      const y = d3.scaleLinear().domain(this.domain).nice().rangeRound([height, 0]);

      let barWrap = chartWrap.selectAll<SVGGElement, number>('g.bar-wrap').data([1]);
      barWrap.exit().remove();
      barWrap = barWrap.enter().append('g')
        .attr('class', 'bar-wrap')
        .merge(barWrap);

      let barGroup = barWrap.selectAll<SVGGElement, {name: string, series: {name: string, value: number}}>('g.bar-group').data(this.data);
      barGroup.exit().remove();
      barGroup = barGroup.enter().append('g')
        .attr('class', 'bar-group')
        .merge(barGroup)
        .attr('transform', d => `translate(${xScale(d.name)}, 0)`);

      let barRects = barGroup.selectAll<SVGRectElement, {name: string, value: number}>('rect.bar').data(d => d.series.map(item => item));
      barRects.enter()
        .append('rect')
        .merge(barRects)
        .attr('class', 'bar')
        .attr('width', x1Scale.bandwidth())
        .attr('height', d => height - y(d.value))
        .attr('x', (d: any) => x1Scale(d.name))
        .attr('y', d => y(d.value))
        .attr('fill', (d, i) => this.barColors[i]);

      let yAxis = chartWrap.selectAll<SVGGElement, number>('g.y-axis').data([1]);
      yAxis.enter()
        .append('g')
        .attr('class', 'y-axis')
        .merge(yAxis)
        .call(d3.axisLeft(y));
    }
  }
}
