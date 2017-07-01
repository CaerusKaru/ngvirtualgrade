import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchonHomeComponent } from './archon-home/archon-home.component';
import {ArchonRoutingModule} from './archon-routing.module';
import { ArchonItemComponent } from './archon-item/archon-item.component';
import { ArchonCreateComponent } from './archon-create/archon-create.component';
import {ArchonMaterialModule} from './archon-material/archon-material.module';
import {ArchonCovalentModule} from './archon-covalent/archon-covalent.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    ArchonCovalentModule,
    CommonModule,
    FlexLayoutModule,
    ArchonMaterialModule,
    ArchonRoutingModule
  ],
  declarations: [ArchonHomeComponent, ArchonItemComponent, ArchonCreateComponent]
})
export class ArchonModule { }
