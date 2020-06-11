import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlumberProfilePage } from './plumber-profile';

@NgModule({
  declarations: [
    PlumberProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(PlumberProfilePage),
  ],
})
export class PlumberProfilePageModule {}
