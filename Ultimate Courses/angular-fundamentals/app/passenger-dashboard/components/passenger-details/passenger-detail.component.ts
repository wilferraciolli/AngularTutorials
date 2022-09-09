import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { cache } from 'awesome-typescript-loader/dist/cache';
import { Passenger } from '../../models/passenger.interface';

@Component({
  selector: 'passenger-detail',
  styleUrls: ['passenger-detail.component.scss'],
  template: `
    <div>
      <span
        class="status"
        [ngClass]="{
              'checked-in': detail.checkedIn,
              'checked-out': !detail.checkedIn
            }"></span>
      <div *ngIf="editing">
        <input
          type="text"
          [value]="detail.fullname"
          (input)="onNameChange(name.value)"
          #name>
      </div>
      <div *ngIf="!editing">
        {{ detail.fullname }}
      </div>

      <!--        <p>{{ passenger | json }}</p>-->
      <div class="date">
        Check-in date:  {{
        detail.checkInDate ?
          (detail.checkInDate | date: 'yMMMd') :
          ('Not checked-in' | uppercase)
        }}
      </div>
      <div class="children">
        <!-- safe navigation to only evaluate expression if preconditions are not null-->
        Number of children: {{ detail.children?.length || 0 }}
      </div>
      <button
        (click)="toggleEdit()">
        {{ editing ? 'Done' : 'Edit'}}
      </button>
      <button
        (click)="onRemove()">
        Delete
      </button>
    </div>
  `
})
export class PassengerDetailComponent implements OnInit, OnChanges {
  @Input()
  detail: Passenger;

  @Output()
  remove: EventEmitter<any> = new EventEmitter();

  @Output()
  edit: EventEmitter<any> = new EventEmitter();

  editing: boolean = false;

  constructor() {
  }

  ngOnInit(){
    console.log('Handling ngOnInit, this is done after onChanges ');
  }

  public ngOnChanges(changes): void {
    console.log('Handling ngOnChanges, this is done before onInit ');

    if (changes.detail){
      // this will prevent the parent from binding to the children passenger, this is used to make sure that only when we are done editing, it will update the parent
      this.detail = Object.assign({}, changes.detail.currentValue);
    }
  }

  public onNameChange(value: string): void {
    this.detail.fullname = value;
    // console.log('Value ', value);
  }

  public toggleEdit() {
    // when the done button is clicked, then this will be true before setting the editing flag back to false
    if (this.editing) {
      this.edit.emit(this.detail);
    }
    this.editing = !this.editing;
  }

  public onRemove() {
    // reference the event and emit it
    this.remove.emit(this.detail);
  }
}
