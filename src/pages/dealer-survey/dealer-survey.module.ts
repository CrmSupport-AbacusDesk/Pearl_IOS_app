import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealerSurveyPage } from './dealer-survey';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    DealerSurveyPage,
  ],
  imports: [
    IonicPageModule.forChild(DealerSurveyPage),
    IonicSelectableModule
  ],
})
export class DealerSurveyPageModule {}
