import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../state/spinner/spinner.reducer';
import { EventComponent } from './containers/event/event.component';
import { AddAttendeeComponent } from './components/add-attendee/add-attendee.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { reducers } from './state';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('event', reducers),
    RouterModule.forChild([
      { path: '', component: EventComponent }
    ])
  ],
  declarations: [
    EventComponent,
    AddAttendeeComponent,
    EventListComponent
  ]
})
export class EventModule { }
