import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { USuperheroPage } from './u-superhero.page';

const routes: Routes = [
  {
    path: '',
    component: USuperheroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class USuperheroPageRoutingModule {}
