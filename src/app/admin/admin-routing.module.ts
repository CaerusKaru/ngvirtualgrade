import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AdminHomeComponent} from './admin-home/admin-home.component';
import {AdminItemComponent} from './admin-item/admin-item.component';
import {AdminCreateComponent} from './admin-create/admin-create.component';

const adminRoutes: Routes = [
    {
      path: '',
      component: AdminHomeComponent
    },
    {
      path: ':course/create',
      component: AdminCreateComponent
    },
    {
      path: ':course/:id',
      component: AdminItemComponent
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}

