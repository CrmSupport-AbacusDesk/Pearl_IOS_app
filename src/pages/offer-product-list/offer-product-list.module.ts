import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferProductListPage } from './offer-product-list';

@NgModule({
  declarations: [
    OfferProductListPage,
  ],
  imports: [
    IonicPageModule.forChild(OfferProductListPage),
  ],
})
export class OfferProductListPageModule {}
