import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EventComponent } from './containers/event/event.component';
import { AddAttendeeComponent } from './components/add-attendee/add-attendee.component';
import { EventListComponent } from './components/event-list/event-list.component';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
