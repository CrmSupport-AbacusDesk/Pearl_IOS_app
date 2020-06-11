import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferDetailPage } from './offer-detail';

@NgModule({
  declarations: [
    OfferDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(OfferDetailPage),
  ],
})
export class OfferDetailPageModule {}
