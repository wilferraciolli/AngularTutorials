import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';


@Component({
    selector: 'app-arch',
    templateUrl: './arch.component.html',
    styleUrls: ['./arch.component.scss'],
    standalone: false
})
export class ArchComponent implements OnInit {
  ngOnInit(): void {
    var svg = d3.select("svg")
      .append("g")
      .attr("transform", "translate(150,50)");

    // Function is used
    var arc = d3.arc()
      .innerRadius(40)
      .outerRadius(45)
      .startAngle(11)
      .endAngle(8)
      .cornerRadius(15);

    svg.append("path")
      .attr("class", "arc")
      // @ts-ignore
      .attr("d", arc)
      .attr("fill", "green");


    // const arc = d3.arc()
    //   .innerRadius(0)
    //   .outerRadius(100)
    //   .startAngle(0)
    //   .endAngle(Math.PI / 2);
  }

}
