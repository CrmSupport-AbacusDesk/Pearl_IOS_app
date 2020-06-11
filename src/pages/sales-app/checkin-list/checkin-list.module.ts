import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckinListPage } from './checkin-list';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [
    CheckinListPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckinListPage),
    MomentModule
  ],
})
export class CheckinListPageModule {}
