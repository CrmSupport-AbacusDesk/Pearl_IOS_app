import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchPage } from '../search/search';


@IonicPage()
@Component({
  selector: 'page-network',
  templateUrl: 'network.html',
})
export class NetworkPage {

  pageType:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
    this.pageType = this.navParams.get('type');
  }

  goToSearch(){
    this.navCtrl.push(SearchPage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NetworkPage');
  }

}
