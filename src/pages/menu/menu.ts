import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlumberProfilePage } from '../plumber-profile/plumber-profile';
import { EnquiryPage } from '../enquiry/enquiry';
import { ContactusPage } from '../contactus/contactus';
import { AboutusPage } from '../aboutus/aboutus';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  goToProfile()
  {
    this.navCtrl.push(PlumberProfilePage);
  }

  goToEnquiry()
  {
    this.navCtrl.push(EnquiryPage);
  }

  goTocontact()
  {
    this.navCtrl.push(ContactusPage);
  }

  goToAbout()
  {
    this.navCtrl.push(AboutusPage);
  }

}
