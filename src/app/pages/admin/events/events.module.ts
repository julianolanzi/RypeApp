import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventsRoutes } from './events.routing';
import {
  IConfig,
  NgxMaskDirective,
  NgxMaskPipe,
  provideNgxMask,
} from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AllEventsComponent } from './all-events/all-events.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { MyEventsComponent } from './my-events/my-events.component';
import { HeaderEventsComponent } from './my-events/header-events/header-events.component';

export const options: Partial<null | IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  declarations: [AllEventsComponent, CreateEventComponent, MyEventsComponent, HeaderEventsComponent],
  providers: [provideNgxMask()],
  imports: [
    CommonModule,
    RouterModule.forChild(EventsRoutes),
    NgxMaskDirective,
    NgxMaskPipe,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class EventsModule { }
