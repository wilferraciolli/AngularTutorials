import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatIconModule, MatRippleModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(private readonly router: Router) {}

  protected readonly cards: FormCard[] = [
    {
      title: 'Contact Form',
      description:
        'Basic signal form with required fields, email validation, min/max length, and pattern matching on phone.',
      icon: 'person',
      route: '/forms/contact',
      badge: 'Basic',
      badgeColor: 'primary',
    },
    {
      title: 'Cross-Field Validation',
      description:
        'Form where one field depends on another — e.g. password confirmation, date range, or conditional required.',
      icon: 'compare_arrows',
      route: '/forms/cross-field',
      badge: 'Intermediate',
      badgeColor: 'accent',
    },
    {
      title: 'Dynamic Array Form',
      description:
        'Form with a dynamic list of items — add/remove rows, each with their own validation rules.',
      icon: 'list',
      route: '/forms/arrays',
      badge: 'Advanced',
      badgeColor: 'warn',
    },
    {
      title: 'Disabled & Readonly Logic',
      description:
        'Demonstrates conditional disabled and readonly fields driven by other field values using schema logic.',
      icon: 'lock',
      route: '/forms/disabled',
      badge: 'Intermediate',
      badgeColor: 'accent',
    },
    {
      title: 'Async Validation',
      description:
        'Fields validated against a server — e.g. username availability check with debounce and pending state.',
      icon: 'cloud_sync',
      route: '/forms/async',
      badge: 'Advanced',
      badgeColor: 'warn',
    },
    {
      title: 'Standard Schema',
      description:
        'Using a third-party schema library (Zod / Valibot) with validateStandardSchema() for field rules.',
      icon: 'schema',
      route: '/forms/standard-schema',
      badge: 'Advanced',
      badgeColor: 'warn',
    },
  ];

  protected navigate(route: string): void {
    this.router.navigate([route]);
  }
}
