import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams } from 'ionic-angular';
import { EnquiryserviceProvider } from '../../providers/enquiryservice/enquiryservice';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-select-registration-type',
  templateUrl: 'select-registration-type.html',
})
export class SelectRegistrationTypePage {
  
  registerTypeList: any = [];
  data: any = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public service: EnquiryserviceProvider) 
  {
    this.data.registerType = '';
    this.getCustomerType();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectRegistrationTypePage');
  }
  
  getCustomerType() 
  {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });
    
    this.service.getCustomerType().then((response:any)=>{
      console.log(response);
      
      this.registerTypeList = response.roleData; 
      loading.dismiss();

    }).catch((error:any)=>
    {
      if(error)
      {
        loading.dismiss();
      }
      
    });
    loading.present();
  }
  
  goToRegisterPage() {
    
    if(this.data.registerType == 'Staff Login') 
    {
      this.navCtrl.push(LoginPage);
    } 
    else 
    {
      const selectedArr = this.registerTypeList.findIndex(row => row.name == this.data.registerType);
      const registerType = this.registerTypeList[selectedArr];
      this.navCtrl.push(LoginPage, {registerType1: registerType});
    }
    
  }
  
}
