import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clipboard',
  templateUrl: './clipboard.component.html',
  styleUrls: ['./clipboard.component.scss']
})
export class ClipboardComponent implements OnInit {

  public source: any;
  public destination: any;

  public copyButton: any;
  public pasteButton: any;
  public code: string = `export class Pizza extends Food {
    constructor(private name: string) {
    }
  }`;

  public ngOnInit(): void {
    // check if clipboard is supported
    if ('clipboard' in window.navigator) {
      // get the source of the text to copy
      this.source = document.querySelector('.source');

      // get the destination to paste to
      this.destination = document.querySelector('.destination');

      this.copyButton = document.querySelector('.copy');
      this._assignCopyButton();

      this.pasteButton = document.querySelector('.paste');
      this._assignPasteButton();

      // add events to handler for copy and paste
      this._addHandlerCopyEvent();
      this._addHandlerPasteEvent();

      // add intercept events
      this._addHandlerInterceptCopyEvent();
      this._addHandlerInterceptPasteEvent();
    }
  }

  private _assignCopyButton(): void {
    // create callback function to add to the copy button
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(this.source.innerText);
        //  console.log('copied to clipboard');
      } catch (error) {
        console.log('error ', error);
      }
    };

    this.copyButton.addEventListener('click', copyToClipboard);
  }

  private _assignPasteButton(): void {
    // create callback function to add to the paste button
    const pasteToClipboard = async () => {
      try {
        // read the clipboard contents with permission to read from pasteboard
        const text: string = await navigator.clipboard.readText();
        this.destination.innerText = text;
        // console.log(`Paste ${ text }`);
      } catch (error) {
        console.log('error ', error);
      }
    };

    this.pasteButton.addEventListener('click', pasteToClipboard);
  }

  // not working
  private _addHandlerCopyEvent(): void {
    document.addEventListener('copy', (event) => {
      event.preventDefault();
      // @ts-ignore
      event.clipboardData?.setData('text/plain', event.target.innerText
                                                      .replace('Pizza', 'Burger'));
    });
  }

  // not working
  private _addHandlerPasteEvent(): void {
    document.addEventListener('paste', (event) => {
      event.preventDefault();
      // @ts-ignore
      const text = event.clipboardData.getData('text/plain');
      this.destination.innerText = text;
    });
  }

  // method to intercept what is being copied using crtl+C then we can overide it
  private _addHandlerInterceptCopyEvent() {
    document.addEventListener('copy', (event) => {
      event.preventDefault();
      // @ts-ignore
      event.clipboardData?.setData('text/plain', event.target.innerText
                                                      .replace('Pizza', 'Burger'));
    });
  }

  // method to intercept the paste event and overide it
  private _addHandlerInterceptPasteEvent() {
    document.addEventListener('paste', (event) => {
      event.preventDefault();
      // @ts-ignore
      const text = event.clipboardData.getData('text/plain');
      this.destination.innerText = text;
    });
  }
}
