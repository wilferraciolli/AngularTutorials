import { logMessages } from '@angular-devkit/build-angular/src/tools/esbuild/utils';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-e-signature',
  templateUrl: './e-signature.component.html',
  styleUrls: ['./e-signature.component.scss']
})
export class ESignatureComponent implements OnInit {
  public canvas: any;
  public state!: MouseMovementState;

  public ngOnInit(): void {
    if (this.isCanvasSupported()) {
      this.canvas = document.querySelector('canvas');
      if (this.canvas) {
        const context = this.canvas.getContext('2d');
        const { left, top } = this.canvas.getBoundingClientRect(); // get the correct boundaries of the canvas so the x and y are calculated based on the canvas and not the page

        if (context) {
          // add some formatting to the canvas
          context.strokeStyle = '#222';
          context.lineCap = 'round';
          context.lineJoin = 'round';
          context.lineWidth = 4;
        }

        this.state = this.createInitialState();
        this.addMouseDownEventToCanvas(left, top); // calculate the starting position based on the canvas width
        this.addMouseMoveEventToCanvas(left, top); // calculate the ending position based on the canvas width
      }
    }
  }

  private addMouseDownEventToCanvas(left: number, top: number): void {
    console.log('working out left ', left);
    console.log('working out top ', top);
    // @ts-ignore
    this.canvas.addEventListener('mousedown', ({ clientX, clientY }) => {
      // override the start on the state, considering the canvas boundaries
      this.state = { ...this.state, start: { x: clientX - left, y: clientY - top } };
      console.log(this.state);
    });
  }

  private addMouseMoveEventToCanvas(left: number, top: number): void {
    // @ts-ignore
    this.canvas.addEventListener('mousemove', ({ clientX, clientY }) => {
      // override the end on the state, considering the canvas boundaries
      this.state = { ...this.state, end: { x: clientX - left, y: clientY - top } };
      console.log(this.state);
    });
  }

  private isCanvasSupported(): boolean {
    let htmlCanvasElement = window.HTMLCanvasElement;

    return htmlCanvasElement !== null;
  }

  private createInitialState(): MouseMovementState {
    // create a state to get the starting position
    return {
      start: {
        x: null, y: null
      },
      end: {
        x: null, y: null
      }
    };
  }
}

export interface MouseMovementState {
  start: {
    x: number | null;
    y: number | null;
  },
  end: {
    x: number | null;
    y: number | null;
  }
}
