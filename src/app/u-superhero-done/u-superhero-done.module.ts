import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { USuperheroDonePageRoutingModule } from './u-superhero-done-routing.module';

import { USuperheroDonePage } from './u-superhero-done.page';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    USuperheroDonePageRoutingModule,
    WebcamModule, ReactiveFormsModule
  ],
  declarations: [USuperheroDonePage]
})
export class USuperheroDonePageModule {}
