import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss'],
    standalone: false
})
export class BarChartComponent implements OnInit {

  private data = [
    { "Framework": "Vue", "Stars": "66443", "Released": "2014" },
    { "Framework": "React", "Stars": "150793", "Released": "2013" },
    { "Framework": "Angular", "Stars": "162342", "Released": "2016" },
    { "Framework": "Backbone", "Stars": "37647", "Released": "2010" },
    { "Framework": "Ember", "Stars": "21471", "Released": "2011" },
  ];

  private svg: any;
  private margin: number = 50;
  private width: number = 750 - (this.margin * 2);
  private height: number = 400 - (this.margin * 2);

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);
  }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.Framework))
      .padding(0.2);
    console.log('x ', data.map(d => d.Framework));

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");
    console.log('this.svg ', this.svg);

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 200000])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: any) => x(d.Framework))
      .attr("y", (d: any) => y(d.Stars))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => this.height - y(d.Stars))
      .attr("fill", "#d04a35");
  }
}
