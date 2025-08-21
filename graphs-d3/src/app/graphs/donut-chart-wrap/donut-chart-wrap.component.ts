import { Component, OnInit, OnDestroy, AfterContentInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { ViewChild } from '@angular/core';

import { DonutChartComponent } from './../donut-chart/donut-chart.component';

// import * as HOBBITON from './hobbiton.json';
import { ChartControlsService } from '../chart-controls.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

export class OrderState {
  state!: string;
  stateDisplayValue!: string;
  count!: number;
}

const HOBBITON_DATA = {
  city: 'hining-on-the-hill',
  orderStates: [
    {
      state: 'preparing',
      stateDisplayValue: 'Preparing',
      count: 10
    },
    {
      state: 'ready',
      stateDisplayValue: 'Ready',
      count: 10
    },
    {
      state: 'inTransit',
      stateDisplayValue: 'Out for delivery',
      count: 10
    },
    {
      state: 'delivered',
      tateDisplayValue: 'Delivered',
      count: 10
    }
  ]
}


@Component({
    selector: 'app-donut-chart-wrap',
    templateUrl: './donut-chart-wrap.component.html',
    styleUrls: ['./donut-chart-wrap.component.scss'],
    standalone: false
})
export class DonutChartWrapComponent implements OnInit, OnDestroy, AfterContentInit {

  @ViewChild('ordersByStatusChart', { static: true })
  chart!: DonutChartComponent;

  orderStates: OrderState[] = [];

  chartData: number[] = [];

  displayedColumns = ['legend', 'orderStatus', 'total'];

  refreshInterval: any;

  constructor(private router: Router, public chartControlsService: ChartControlsService) {
    this.chartControlsService.fullScreen = false;

  }

  ngOnInit() {
  }

  initialize() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
    this.generateData();
    this.chart.data = [...this.chartData];
    this.refreshInterval = setInterval(() => {
      if (document.hasFocus()) {
        this.updateStates();
        this.chart.data = [...this.chartData];
      }
    }, 1000);

  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  ngAfterContentInit() {
    this.initialize();
  }

  generateData() {
    this.orderStates = [];
    HOBBITON_DATA.orderStates.forEach((state: any) => {
      const target = new OrderState();
      target.state = state.state;
      target.stateDisplayValue = state.stateDisplayValue;
      target.count = randomInt(0, 100);
      this.orderStates.push(target);
    });
    this.chartData = [];
    this.orderStates.forEach((state) => {
      this.chartData.push(state.count);
    });
  }

  updateStates() {
    const increment = (val: any, plus: any, minus: any) => {
      return val + plus - minus;
    }
    const newOrders = randomInt(0, 10);
    const newReady = randomInt(0, Math.min(10, this.orderStates[0].count));
    const newTransit = randomInt(0, Math.min(10, this.orderStates[1].count));
    const newDelivered = randomInt(0, Math.min(10, this.orderStates[2].count));
    this.orderStates[0].count = increment(this.orderStates[0].count, newOrders, newReady);
    this.orderStates[1].count = increment(this.orderStates[1].count, newReady, newTransit);
    this.orderStates[2].count = increment(this.orderStates[2].count, newTransit, newDelivered);
    this.orderStates[3].count = increment(this.orderStates[3].count, newDelivered, 0);
    this.chartData = [];
    this.orderStates.forEach((state) => {
      this.chartData.push(state.count);
    });
  }

  toggleData(event: MatSlideToggleChange) {
    this.chartControlsService.showData = event.checked;
  }
}

export function randomInt(min: any, max: any) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
