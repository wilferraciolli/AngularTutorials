import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FadeInCardComponent } from './fade-in-card/fade-in-card.component';
import { SimpleMotionComponent } from './simple-motion/simple-motion.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SimpleMotionComponent, FadeInCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'animations';

  public ngOnInit(): void {
  }
}
