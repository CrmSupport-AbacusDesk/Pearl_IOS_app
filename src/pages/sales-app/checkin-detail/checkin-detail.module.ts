import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckinDetailPage } from './checkin-detail';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [
    CheckinDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckinDetailPage),
    MomentModule
  ],
})
export class CheckinDetailPageModule {}
