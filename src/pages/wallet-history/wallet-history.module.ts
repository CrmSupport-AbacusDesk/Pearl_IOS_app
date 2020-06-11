import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalletHistoryPage } from './wallet-history';

@NgModule({
  declarations: [
    WalletHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(WalletHistoryPage),
  ],
})
export class WalletHistoryPageModule {}
