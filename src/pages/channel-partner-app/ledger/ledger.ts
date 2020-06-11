import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MyserviceProvider } from '../../../providers/myservice/myservice';

@IonicPage()
@Component({
  selector: 'page-ledger',
  templateUrl: 'ledger.html',
})
export class LedgerPage {
  
  ledgerData:any = [];
  loading:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: MyserviceProvider, public loadingCtrl: LoadingController) 
  {
    this.getLedgerData();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LedgerPage');
  }
  
  getLedgerData()
  {
    this.lodingPersent();
    
    this.service.addData('',"channelPartner/getLedgerData").then(resp=>
      {
        console.log(resp);
        this.ledgerData = resp;
        
        this.loading.dismiss();
      }).catch((error:any)=>
      {
        this.loading.dismiss();
      });
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
  