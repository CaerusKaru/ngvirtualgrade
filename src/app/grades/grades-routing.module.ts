import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {GradesHomeComponent} from './grades-home/grades-home.component';
import {GradesItemComponent} from './grades-item/grades-item.component';

const gradesRoutes: Routes = [
    {
      path: '',
      component: GradesHomeComponent
    },
    {
      path: ':course/:id',
      component: GradesItemComponent
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(gradesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class GradesRoutingModule {}

