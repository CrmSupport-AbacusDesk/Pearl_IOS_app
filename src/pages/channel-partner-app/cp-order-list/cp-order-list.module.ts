import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CpOrderListPage } from './cp-order-list';

@NgModule({
  declarations: [
    CpOrderListPage,
  ],
  imports: [
    IonicPageModule.forChild(CpOrderListPage),
  ],
})
export class CpOrderListPageModule {}
