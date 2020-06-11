import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GstCalculatorPage } from './gst-calculator';

@NgModule({
  declarations: [
    GstCalculatorPage,
  ],
  imports: [
    IonicPageModule.forChild(GstCalculatorPage),
  ],
})
export class GstCalculatorPageModule {}
