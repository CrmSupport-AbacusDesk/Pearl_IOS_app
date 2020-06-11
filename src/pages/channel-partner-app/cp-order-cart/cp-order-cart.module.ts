import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CpOrderCartPage } from './cp-order-cart';

@NgModule({
  declarations: [
    CpOrderCartPage,
  ],
  imports: [
    IonicPageModule.forChild(CpOrderCartPage),
  ],
})
export class CpOrderCartPageModule {}
