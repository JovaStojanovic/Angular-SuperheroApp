import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { USuperheroDonePage } from './u-superhero-done.page';

const routes: Routes = [
  {
    path: '',
    component: USuperheroDonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class USuperheroDonePageRoutingModule {}
