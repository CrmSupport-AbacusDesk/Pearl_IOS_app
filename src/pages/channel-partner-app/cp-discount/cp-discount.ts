import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MyserviceProvider } from '../../../providers/myservice/myservice';

@IonicPage()
@Component({
  selector: 'page-cp-discount',
  templateUrl: 'cp-discount.html',
})
export class CpDiscountPage {

  discountData:any=[];
  loading:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: MyserviceProvider, public loadingCtrl: LoadingController) 
  {
    this.getCpDiscount();
  }
  
  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad CpDiscountPage');
  }
  
  getCpDiscount()
  {
    this.lodingPersent();

    this.service.addData('','channelPartner/getCpDiscount').then((result)=>
    {
      console.log(result);
      this.discountData = result;

      this.loading.dismiss();
    }).catch((error:any)=>
    {
      this.loading.dismiss();
    });
  }

  ngOnInit() {
  }

  lodingPersent()
  {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });
    this.loading.present();
  }
  
}
