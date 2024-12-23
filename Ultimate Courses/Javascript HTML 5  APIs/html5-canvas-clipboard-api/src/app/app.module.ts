import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { ESignatureComponent } from './e-signature/e-signature.component';
import { ClipboardComponent } from './clipboard/clipboard.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    ESignatureComponent,
    ClipboardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
