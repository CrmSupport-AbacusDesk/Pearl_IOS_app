import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EndCheckinPage } from './end-checkin';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [
    EndCheckinPage,
  ],
  imports: [
    IonicPageModule.forChild(EndCheckinPage),
    MomentModule
  ],
})
export class EndCheckinPageModule {}
