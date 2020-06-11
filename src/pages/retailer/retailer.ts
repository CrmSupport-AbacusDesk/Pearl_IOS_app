import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RetailerDetailPage } from '../retailer-detail/retailer-detail';
import { MyserviceProvider } from '../../providers/myservice/myservice';

/**
* Generated class for the RetailerPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-retailer',
  templateUrl: 'retailer.html',
})
export class RetailerPage {
  
  show_fake_screen:boolean=true;
  dist_data:any=[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams,  public serv: MyserviceProvider) {
    this.get_data();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad RetailerPage');
  }
  
  RetailerDetail(){
    this.navCtrl.push(RetailerDetailPage)
  }
  
  get_data(){
    this.serv.get_data().then((response:any) => {
      console.log(response);
      this.show_fake_screen=false;
      this.dist_data=response;
      this.dist_data.map((item)=>{
        item.first_char = item.company_name.charAt(0);
      });
      console.log(this.dist_data);
      
    },
    error => {
      console.log(error);
    });
  }
  
}
