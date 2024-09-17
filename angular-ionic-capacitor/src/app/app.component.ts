import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButton, MatFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { Camera, CameraResultType, CameraSource, Photo } from "@capacitor/camera";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIcon, MatButton, MatFabButton, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-ionic-capacitor';
  public image: string = '';

  public async captureImage(): Promise<void> {
    const image: Photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      source: CameraSource.Prompt,
      resultType: CameraResultType.Base64
    });

    if (image){
      this.image = `data:image/jpeg;base64,${image.base64String}`!;
    }
  }
}
