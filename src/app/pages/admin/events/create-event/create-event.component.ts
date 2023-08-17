import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CreateEventRequest } from 'src/app/models/events/create-event/create-event-request';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {
  createEventForm!: FormGroup;

  eventData!: CreateEventRequest;
  constructor(private datePipe: DatePipe, private store: Store<GlobalState>){
    this.createEventForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      game: new FormControl('', [Validators.required]),
      platform: new FormControl('', [Validators.required]),
      typeEvent: new FormControl('', [Validators.required]),
    });
  }

}
