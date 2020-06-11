import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';

/**
 * Generated class for the PointLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-point-location',
  templateUrl: 'point-location.html',
})
export class PointLocationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public backGroundLocation: BackgroundGeolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointLocationPage');
  }

}
