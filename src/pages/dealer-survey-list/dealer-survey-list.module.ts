import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealerSurveyListPage } from './dealer-survey-list';

@NgModule({
  declarations: [
    DealerSurveyListPage,
  ],
  imports: [
    IonicPageModule.forChild(DealerSurveyListPage),
  ],
})
export class DealerSurveyListPageModule {}
