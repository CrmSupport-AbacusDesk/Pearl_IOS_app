import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkPlanPage } from './work-plan';

@NgModule({
  declarations: [
    WorkPlanPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkPlanPage),
  ],
})
export class WorkPlanPageModule {}
