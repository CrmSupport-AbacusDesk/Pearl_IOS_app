import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { TermConditionPage } from '../term-condition/term-condition';

@IonicPage()
@Component({
  selector: 'page-my-wallet',
  templateUrl: 'my-wallet.html',
})
export class MyWalletPage {
  
  scan_code_data:any=[];
  user_data:any=[];
  scheme_validation_data:any=[];
  data:any={};
  scheme_detail:any=[];
  flag:any='';
  limit=0;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public serve: MyserviceProvider, public toastCtrl: ToastController) 
  {
    
  }
  
  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad MyWalletPage');
  }
  
  ionViewWillEnter()
  {
    this.get_scan_code_data();
    this.get_user_detail();
    this.get_scheme_validation();
    this.get_scheme_detail();
  }
  
  get_scan_code_data()
  {
    this.serve.addData('','Plumber/get_scan_code_data').then((result)=>
    {
      console.log(result);
      this.scan_code_data = result;
    });
  }
  
  get_scan_code_data_scroll(infiniteScroll)
  {
    this.serve.addData({'limit':this.scan_code_data.length},'Plumber/get_scan_code_data').then((result)=>
    {
      console.log(result);
      if(result=='')
      {
        this.flag=1;
      }
      else
      {
        setTimeout(()=>{
          this.scan_code_data = this.scan_code_data.concat(result);
          infiniteScroll.complete();
        },1000);
      }
    });
  }
  
  get_user_detail()
  {
    this.serve.addData('','Plumber/plumber_deatil').then((result)=>
    {
      console.log(result);
      this.user_data = result;
    });
  }
  
  get_scheme_validation()
  {
    this.serve.addData('','Plumber/get_scheme_validation').then((result)=>
    {
      console.log(result);
      this.scheme_validation_data = result;
    }); 
  }
  
  get_scheme_detail()
  {
    this.serve.addData('','Plumber/scheme_state').then((result)=>
    {
      console.log(result);
      this.scheme_detail = result;
    }); 
  }
  
  sendRedeemRqst:boolean=false;
  
  send_redeem_rqst()
  {
    if(this.sendRedeemRqst == false)
    {
      this.sendRedeemRqst = true;

      const inputData = 
      {
        name : this.user_data.name,
        mobile : this.user_data.mobile,
        transaction_type : 'Redeem Request',
        redeem_point : this.user_data.wallet_point,
        // redeem_amount : parseFloat(this.user_data.wallet_point) * parseFloat(this.scheme_detail.point_value),
        point_value : this.scheme_detail.point_value,
      };
      
      this.serve.addData(inputData,'Plumber/send_redeem_rqst').then((result)=>
      {
        console.log(result);
        this.get_user_detail();
        
        let toast = this.toastCtrl.create({
          message: 'Request Send Successfully',
          duration: 3000,
          position: 'bottom'});
          
          toast.present();
        });
      }
    }
    
    goToTermPage()
    {
      this.navCtrl.push(TermConditionPage);
    }
    
  }
  