import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollowupPage } from './followup';

@NgModule({
  declarations: [
    FollowupPage,
  ],
  imports: [
    IonicPageModule.forChild(FollowupPage),
  ],
})
export class FollowupPageModule {}
