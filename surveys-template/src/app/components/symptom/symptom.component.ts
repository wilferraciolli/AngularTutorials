import {Component, Input, SkipSelf} from '@angular/core';
import {ControlContainer} from "@angular/forms";

@Component({
  selector: 'app-symptom',
  templateUrl: './symptom.component.html',
  styleUrls: ['./symptom.component.scss'],
  viewProviders: [{
    provide: ControlContainer,
    useFactory: (container: ControlContainer) => container,
    deps: [[new SkipSelf(), ControlContainer]],
  }]
})
export class SymptomComponent {
  @Input()
  public modelGroupName!: string;

  selectedItems: Array<string> = [];
  selectedUnit: string = 'celsius';

  public handleSelection(selectedItems: Array<string>): void {
    this.selectedItems = selectedItems;
  }
}
