import { Component, OnInit, inject, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRippleModule } from '@angular/material/core';
import { ThemeService } from '../../services/theme.service';

export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
  tag: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', tag: 'Gas' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', tag: 'Noble' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', tag: 'Alkali' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', tag: 'Alkaline' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', tag: 'Metalloid' }
];

@Component({
  selector: 'wt-theme',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatChipsModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTabsModule,
    MatExpansionModule,
    MatListModule,
    MatDividerModule,
    MatMenuModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatToolbarModule,
    MatRippleModule
  ],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss'
})
export class ThemeComponent implements OnInit {
  currentTheme: string = 'system';
  badgeCount: number = 5;
  sliderValue: number = 40;
  checkboxChecked: boolean = true;
  checkboxIndeterminate: boolean = false;
  slideToggleChecked: boolean = true;
  selectedRadio: string = 'option1';
  selectedOption: string = 'm3';
  selectedChip: string = 'angular';
  autocompleteControl = new FormControl('');
  autocompleteOptions: string[] = ['Angular Material 3', 'Color Roles', 'Dynamic Palette', 'Typography', 'Surface Tint'];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'tag'];
  dataSource = ELEMENT_DATA;

  @ViewChild('sampleDialog') sampleDialogTemplate!: TemplateRef<any>;

  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  public themeService = inject(ThemeService);

  ngOnInit() {
    this.currentTheme = localStorage.getItem('theme') || 'system';
  }

  onThemeChange(theme: 'light' | 'dark' | 'system') {
    this.currentTheme = theme;
    this.themeService.setTheme(theme);
  }

  openSnackBar(message: string = 'Material 3 Snackbar notification triggered!') {
    this.snackBar.open(message, 'Close', {
      duration: 3000
    });
  }

  openDialog() {
    this.dialog.open(this.sampleDialogTemplate, {
      width: '400px'
    });
  }

  incrementBadge() {
    this.badgeCount++;
  }
}
