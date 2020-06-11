import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';

@IonicPage()
@Component({
  selector: 'page-wallet-history',
  templateUrl: 'wallet-history.html',
})
export class WalletHistoryPage {

  txn_data:any=[];
  total_redeem_amount:any;
  flag:any='';
  limit=0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public serve: MyserviceProvider) 
  {
    this.get_transaction_data();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletHistoryPage');
  }

  ionViewWillEnter()
  {
    this.get_transaction_data();
  }

  get_transaction_data()
  {
    this.serve.addData('','Plumber/get_txn_history').then((result)=>
    {
      console.log(result);
      this.txn_data = result['data'];
      this.total_redeem_amount = result['total_redeem_amount'];
    });
  }

  txn_history_scroll(infiniteScroll)
  {
    this.serve.addData({'limit':this.txn_data.length},'Plumber/get_txn_history').then((result)=>
    {
      console.log(result);
      if(result=='')
      {
        this.flag=1;
      }
      else
      {
        setTimeout(()=>{
          this.txn_data = this.txn_data.concat(result['data']);
          infiniteScroll.complete();
        },1000);
      }
    });
  }

}
