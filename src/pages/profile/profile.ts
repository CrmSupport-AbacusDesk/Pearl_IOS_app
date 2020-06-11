import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { PointLocationPage } from '../point-location/point-location';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile_data:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: MyserviceProvider) {
  
  this.profile_detail();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }


  profile_detail()
  {
    this.service.addData({},'Distributor/user_detail').then((result)=>{
      console.log(result);
      this.profile_data = result;
      console.log(this.profile_data);
    });
  }


  point_location()
  {
    this.navCtrl.push(PointLocationPage);
  }

}
