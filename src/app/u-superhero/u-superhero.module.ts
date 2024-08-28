import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { USuperheroPageRoutingModule } from './u-superhero-routing.module';

import { USuperheroPage } from './u-superhero.page';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    USuperheroPageRoutingModule,
    WebcamModule, ReactiveFormsModule
  ],
  declarations: [USuperheroPage]
})
export class USuperheroPageModule {}
