import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { countryComponent } from './country.component';

const routes: Routes = [
  {
    path: '',
    component: countryComponent,
    data: {
      title: 'country'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class countryRoutingModule {}
