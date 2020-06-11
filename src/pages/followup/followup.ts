import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';
import { FollowupserviceProvider } from '../../providers/followupservice/followupservice';
import moment from 'moment';

/**
 * Generated class for the FollowupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-followup',
  templateUrl: 'followup.html',
})
export class FollowupPage {

  date: any;
  search:any = {};


  constructor(public navCtrl: NavController, public navParams: NavParams, public constant: ConstantProvider, public service: FollowupserviceProvider) {
    

    this.search.search_by_date = moment(this.search.search_by_date).format('YYYY-MM-DD');

    
  }

  red_date() {
  this.search.search_by_date =  moment(this.search.search_by_date).subtract(1, 'days');
    this.search.search_by_date = moment(this.search.search_by_date).format('YYYY-MM-DD');
  }

  ad_date = function () {
    this.search.search_by_date = moment(this.search.search_by_date).format('YYYY-MM-DD');
    console.log(this.search.search_by_date);
    this.search.search_by_date = moment(this.search.search_by_date).add(1, 'days');
    this.search.search_by_date = moment(this.search.search_by_date).format('YYYY-MM-DD');
    console.log(this.search.search_by_date);
  }




 formatDate = function (date) {
    return new Date(date)
  }






  ionViewDidLoad() {

    console.log('ionViewDidLoad FollowupPage');
    this.getFollowupList();
  }

  followup_list:any = [];

  getFollowupList()
  {
    this.service.getFollowup({'date':this.search.search_by_date}).then((result)=>{
      console.log(result);
      this.followup_list = result['followup_list'];
    })
  }






}
