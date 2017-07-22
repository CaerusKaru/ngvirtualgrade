import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SwUpdatesService} from './sw-updates.service';
import {ServiceWorkerModule} from '@angular/service-worker';

@NgModule({
  imports: [
    CommonModule,
    ServiceWorkerModule
  ],
  declarations: [],
  providers: [SwUpdatesService]
})
export class SwUpdatesModule { }
