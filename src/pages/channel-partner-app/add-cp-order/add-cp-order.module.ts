import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCpOrderPage } from './add-cp-order';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    AddCpOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCpOrderPage),
    IonicSelectableModule,
    SelectSearchableModule
  ],
})
export class AddCpOrderPageModule {}
