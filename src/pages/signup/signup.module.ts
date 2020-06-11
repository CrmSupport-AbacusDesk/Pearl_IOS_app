import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
    IonicSelectableModule
  ],
})
export class SignupPageModule {}
