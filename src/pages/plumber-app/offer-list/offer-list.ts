import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OfferDetailPage } from '../offer-detail/offer-detail';

/**
 * Generated class for the OfferListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offer-list',
  templateUrl: 'offer-list.html',
})
export class OfferListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferListPage');
  }

  goOnOfferDetailPage(){
	  this.navCtrl.push(OfferDetailPage);
  }

}
