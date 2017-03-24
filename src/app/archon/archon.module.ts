import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchonHomeComponent } from './archon-home/archon-home.component';
import {ArchonRoutingModule} from "./archon-routing.module";
import { ArchonItemComponent } from './archon-item/archon-item.component';
import {CovalentCoreModule} from "@covalent/core";
import { ArchonCreateComponent } from './archon-create/archon-create.component';

@NgModule({
  imports: [
    CovalentCoreModule,
    CommonModule,
    ArchonRoutingModule
  ],
  declarations: [ArchonHomeComponent, ArchonItemComponent, ArchonCreateComponent]
})
export class ArchonModule { }
