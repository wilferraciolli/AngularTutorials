import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartControlsService {

  showData: boolean = false;
  fullScreen: boolean = false;

  constructor() { }
}
