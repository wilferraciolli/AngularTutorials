import {ChangeDetectionStrategy, Component, output, OutputEmitterRef, signal, WritableSignal} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {takeUntilDestroyed, toObservable} from "@angular/core/rxjs-interop";
import {debounceTime, filter} from "rxjs";

@Component({
  selector: 'app-basic-search',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './basic-search.component.html',
  styleUrl: './basic-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicSearchComponent {
  protected queryTerm: OutputEmitterRef<string> = output<string>();

  protected value: WritableSignal<string> = signal<string>('');

  constructor() {
    toObservable(this.value).pipe(
      filter((currentValue: string) => this._shouldSetQueryValue(currentValue)),
      debounceTime(300),
      takeUntilDestroyed()
    ).subscribe((value: string) => {
      console.log('** Value got ', value);
      this.queryTerm.emit(value);
    });
  }

  protected clearField(): void {
    this.value.set('');
  }

  private _shouldSetQueryValue(currentValue: string): boolean {
    console.log('filtering ', currentValue, !!currentValue && currentValue.trim().length > 3);
    return !!currentValue && currentValue.trim().length > 3;
  }
}
