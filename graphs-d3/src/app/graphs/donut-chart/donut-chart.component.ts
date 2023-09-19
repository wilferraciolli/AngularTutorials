import { Component, OnInit, ElementRef, ViewEncapsulation, Input, SimpleChanges, OnChanges } from '@angular/core';

import * as d3 from 'd3';

export class DonutChartDatum {
  code!: string;
  displayValue!: string;
  count!: number;
}


@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DonutChartComponent implements OnInit, OnChanges {

  @Input() data: number[] = [];
  hostElement; // Native element hosting the SVG container
  svg: any; // Top level SVG element
  g: any; // SVG Group element
  arc: any; // D3 Arc generator
  innerRadius: any; // Inner radius of donut chart
  radius: any; // Outer radius of donut chart
  slices: any; // Donut chart slice elements
  labels: any; // SVG data label elements
  totalLabel: any; // SVG label for total
  rawData: any; // Raw chart values array
  total!: number; // Total of chart values
  colorScale: any; // D3 color provider
  pieData: any; // Arc segment parameters for current data set
  pieDataPrevious: any; // Arc segment parameters for previous data set - used for transitions
  colors = d3.scaleOrdinal(d3.schemeCategory10);

  // Pie function - transforms raw data to arc segment parameters
  pie = d3.pie()
    .startAngle(-0.5 * Math.PI)
    .endAngle(0.5 * Math.PI)
    .sort(null)
    // @ts-ignore
    .value((d: number) => d);

  constructor(private elRef: ElementRef) {
    this.hostElement = this.elRef.nativeElement;
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    // @ts-ignore
    if (changes.data) {
      // @ts-ignore
      this.updateChart(changes.data.currentValue);
    }
  }

  private createChart(data: number[]) {

    this.processPieData(data);

    this.removeExistingChartFromParent();

    this.setChartDimensions();

    this.setColorScale();

    this.addGraphicsElement();

    this.setupArcGenerator();

    this.addSlicesToTheDonut();

    this.addLabelsToTheDonut();

    this.addDonutTotalLabel();
  }


  private setChartDimensions() {
    let viewBoxHeight = 100;
    let viewBoxWidth = 200;
    this.svg = d3.select(this.hostElement).append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 ' + viewBoxWidth + ' ' + viewBoxHeight);
  }

  private addGraphicsElement() {
    this.g = this.svg.append("g")
      .attr("transform", "translate(100,90)");
  }

  private setColorScale() {
    this.colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    // Below is an example of using custom colors
    // this.colorScale = d3.scaleOrdinal().domain(["0","1","2","3"]).range(['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728']);
  }

  private processPieData(data: any, initial = true) {
    this.rawData = data;
    this.total = this.rawData.reduce((sum: any, next: any) => sum + next, 0);

    this.pieData = this.pie(data);
    if (initial) {
      this.pieDataPrevious = this.pieData;
    }
  }


  private setupArcGenerator() {
    this.innerRadius = 50;
    this.radius = 80;
    this.arc = d3.arc()
      .innerRadius(this.innerRadius)
      .outerRadius(this.radius);
  }

  private addSlicesToTheDonut() {
    this.slices = this.g.selectAll('allSlices')
      .data(this.pieData)
      .enter()
      .append('path')
      .attr('d', this.arc)
      .attr('fill', (datum: any, index: any) => {
        return this.colorScale(`${index}`);
      })
      .style('opacity', 1);
  }

  private addDonutTotalLabel() {
    this.totalLabel = this.svg
      .append('text')
      .text(this.total)
      .attr('id', 'total')
      .attr('x', 100)
      .attr('y', 80)
      .style('font-size', '10px')
      .style('text-anchor', 'middle');
  }

  // Creates an "interpolator" for animated transition for arc slices
  //   given previous and new arc shapes,
  //   generates a series of arc shapes (be)tween start and end state
  arcTween = (datum: any, index: any) => {
    const interpolation = d3.interpolate(this.pieDataPrevious[index], datum);
    this.pieDataPrevious[index] = interpolation(0);
    return (t: any) => {
      return this.arc(interpolation(t));
    }
  }

  // Creates an "interpolator" for animated transition for arc labels
  //   given previous and new label positions,
  //   generates a series of arc states (be)tween start and end state
  labelTween = (datum: any, index: any) => {
    const interpolation = d3.interpolate(this.pieDataPrevious[index], datum);
    this.pieDataPrevious[index] = interpolation(0);
    return (t: any) => {
      return 'translate(' + this.arc.centroid(interpolation(t)) + ')';
    }
  }

  public updateChart(data: number[]) {
    if (!this.svg) {
      this.createChart(data);
      return;
    }

    this.processPieData(data, false);

    this.updateSlices();

    this.updateLabels();

  }

  private updateSlices() {
    this.slices = this.slices.data(this.pieData);
    this.slices.transition().duration(750).attrTween("d", this.arcTween);
  }

  private updateLabels() {
    this.totalLabel.text(this.total);
    this.labels.data(this.pieData);
    this.labels.each((datum: any, index: any, n: any) => {
      d3.select(n[index]).text(this.labelValueFn(this.rawData[index]));
    });
    this.labels.transition().duration(750).attrTween("transform", this.labelTween);
  }

  private updateTotal() {
    this.totalLabel.text(this.total);
  }

  private removeExistingChartFromParent() {
    // !!!!Caution!!!
    // Make sure not to do;
    //     d3.select('svg').remove();
    // That will clear all other SVG elements in the DOM
    d3.select(this.hostElement).select('svg').remove();
  }

  private addLabelsToTheDonut() {
    this.labels = this.g
      .selectAll('allLabels')
      .data(this.pieData)
      .enter()
      .append('text')
      .text(this.labelValueGetter)
      .attr('transform', (datum: any, index: any) => {
        return 'translate(' + this.arc.centroid(datum) + ')';
      })
      .style('font-size', '8px')
      .style('text-anchor', 'middle');

  }

  private labelValueGetter = (datum: any, index: any) => {
    return this.labelValueFn(this.rawData[index]);
  }

  private labelValueFn(val: any) {
    const pct = Math.floor(val * 100 / this.total);
    return (pct < 4) ? '' : '' + val;
  }

}
