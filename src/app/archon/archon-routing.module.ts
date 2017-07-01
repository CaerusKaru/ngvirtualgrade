import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ArchonHomeComponent} from './archon-home/archon-home.component';
import {ArchonItemComponent} from './archon-item/archon-item.component';
import {ArchonCreateComponent} from './archon-create/archon-create.component';

const archonRoutes: Routes = [
    {
      path: '',
      component: ArchonHomeComponent
    },
    {
      path: ':course/create',
      component: ArchonCreateComponent
    },
    {
      path: ':course/:id',
      component: ArchonItemComponent
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(archonRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ArchonRoutingModule {}

