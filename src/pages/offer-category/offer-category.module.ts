import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferCategoryPage } from './offer-category';

@NgModule({
  declarations: [
    OfferCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(OfferCategoryPage),
  ],
})
export class OfferCategoryPageModule {}
