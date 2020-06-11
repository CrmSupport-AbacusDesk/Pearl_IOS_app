import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CpDiscountPage } from './cp-discount';

@NgModule({
  declarations: [
    CpDiscountPage,
  ],
  imports: [
    IonicPageModule.forChild(CpDiscountPage),
  ],
})
export class CpDiscountPageModule {}
