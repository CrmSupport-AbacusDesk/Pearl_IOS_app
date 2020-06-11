import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlumberTabPage } from './plumber-tab';

@NgModule({
  declarations: [
    PlumberTabPage,
  ],
  imports: [
    IonicPageModule.forChild(PlumberTabPage),
  ],
})
export class PlumberTabPageModule {}
