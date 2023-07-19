import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  public ngOnInit(): void {
    // if (this.isCanvasSupported()) {
    //   const canvas = document.querySelector('canvas');
    //   if (canvas) {
    //     const context = canvas.getContext('2d');
    //     if (context) {
    //       // add some formatting to the canvas
    //       context.strokeStyle = '#222';
    //       context.lineCap = 'round';
    //       context.lineJoin = 'round';
    //       context.lineWidth = 4;
    //
    //       // create a path and update it, this will allow to write to the canvas
    //       context.beginPath();
    //       context.moveTo(10, 10);
    //       context.lineTo(20, 10);
    //       context.lineTo(20, 20);
    //       context.lineTo(10, 20);
    //       context.lineTo(10, 10);
    //       context.stroke();
    //       context.closePath();
    //
    //       // draw to the canvas context
    //       context.fillRect(50,70,100,100);
    //     }
    //   }
    // }
  }

  // private isCanvasSupported(): boolean {
  //   let htmlCanvasElement = window.HTMLCanvasElement;
  //
  //   return htmlCanvasElement !== null;
  // }
}
