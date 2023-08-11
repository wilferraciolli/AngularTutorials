import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-e-signature',
  templateUrl: './e-signature.component.html',
  styleUrls: ['./e-signature.component.scss']
})
export class ESignatureComponent implements OnInit {
  public canvas: any;
  public state!: MouseMovementState;
  public context: any;

  public ngOnInit(): void {
    if (this.isCanvasSupported()) {
      this.canvas = document.querySelector('canvas');
      if (this.canvas) {
        this.context = this.canvas.getContext('2d');
        const { left, top } = this.canvas.getBoundingClientRect(); // get the correct boundaries of the canvas so the x and y are calculated based on the canvas and not the page

        if (this.context) {
          // add some formatting to the canvas
          this.context.strokeStyle = '#222';
          this.context.lineCap = 'round';
          this.context.lineJoin = 'round';
          this.context.lineWidth = 4;
        }

        this.state = this.createInitialState();
        this.addMouseDownEventToCanvas(left, top); // calculate the starting position based on the canvas width
        this.addMouseMoveEventToCanvas(left, top); // calculate the ending position based on the canvas width
        this.addMouseUpEventToCanvas(); // trigger when the user stops drawing
        this.addMouseLeaveEventToCanvas(); // trigger when the user leave the canvas
        this.addDoubleClickToWipeEventToCanvas(); // add doulble click event to wipe the canvas

        // define the render method, this is recursive and will call itself
        this.render();
      }
    }
  }

  private addMouseDownEventToCanvas(left: number, top: number): void {
    // @ts-ignore
    this.canvas.addEventListener('mousedown', ({ clientX, clientY }) => {
      // override the start on the state, considering the canvas boundaries
      this.state = { ...this.state, drawing: true, start: { x: clientX - left, y: clientY - top } };
      // console.log(this.state);
    });
  }

  private addMouseMoveEventToCanvas(left: number, top: number): void {
    // @ts-ignore
    this.canvas.addEventListener('mousemove', ({ clientX, clientY }) => {
      // override the end on the state, considering the canvas boundaries
      this.state = { ...this.state, end: { x: clientX - left, y: clientY - top } };
      // console.log(this.state);
    });
  }

  private addMouseUpEventToCanvas(): void {
    // @ts-ignore
    this.canvas.addEventListener('mouseup', () => {
      // override the state, to stop drawing
      this.state = { ...this.state, drawing: false };
    });
  }

  private addMouseLeaveEventToCanvas(): void {
    // @ts-ignore
    this.canvas.addEventListener('mouseleave', () => {
      // override the state, to stop drawing
      this.state = { ...this.state, drawing: false };
    });
  }

  private addDoubleClickToWipeEventToCanvas(): void {
    // @ts-ignore
    this.canvas.addEventListener('dblclick', () => {
      // clear rectangle
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    });
  }

  /**
   * Method to render the canvas
   */
  private render(): void {
    if (this.context) {
      // start drawing the path on the canvas only if the user is drawing
      if (this.state.drawing) {
        this.context.beginPath();
        this.context.moveTo(this.state.start.x, this.state.start.y);
        this.context.lineTo(this.state.end.x, this.state.end.y);
        this.context.stroke();
      }

      this.state = { ...this.state, start: { ...this.state.end } };

      // recursively call the render method
      window.requestAnimationFrame(this.render.bind(this));
    }
  }

  private isCanvasSupported(): boolean {
    let htmlCanvasElement = window.HTMLCanvasElement;

    return htmlCanvasElement !== null;
  }

  private createInitialState(): MouseMovementState {
    // create a state to get the starting position
    return {
      drawing: false,
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
  drawing: boolean;
  start: {
    x: number | null;
    y: number | null;
  },
  end: {
    x: number | null;
    y: number | null;
  }
}
