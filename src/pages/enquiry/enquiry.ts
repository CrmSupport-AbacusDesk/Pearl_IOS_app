import { Component } from '@angular/core';
// import { Storage } from '@ionic/storage';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { EnquiryserviceProvider } from '../../providers/enquiryservice/enquiryservice';
import { HomePage } from '../../pages/home/home';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { SearchPage } from '../search/search';


/**
 * Generated class for the EnquiryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enquiry',
  templateUrl: 'enquiry.html',
})
export class EnquiryPage {
state_list:any=[];
// public state_name:any;
city_list:any=[];
product_id:any;
validations_form: FormGroup;
form = {company:'',fname:'',lname:'',email:'',phone:'' ,state:'',city:'',enquiry:'',product_id:''};
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: EnquiryserviceProvider ,public loadingCtrl: LoadingController,  public toastCtrl: ToastController, public formBuilder: FormBuilder) 

  {
    this.product_id=this.navParams.get('product_id');
  console.log(this.product_id);
  
    this.validations_form = formBuilder.group({
      company: ['', Validators.compose([Validators.required])],
      fname: ['', Validators.compose([Validators.required])],
      lname: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')])],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      state: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      enquiry: ['', Validators.compose([Validators.required])]
    });

    this.getState();
   
  }

  getState() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });
    
    this.service.getState().then((response:any)=>{
      loading.dismiss();
      console.log(response);
      this.state_list = response;
      
    });
    loading.present();
  }

  getCity(val) {
    console.log(val);
    
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });
    
    this.service.getCity(val).then((response:any)=>{
      loading.dismiss();
      console.log(response);
      this.city_list = response;
      
    });
    loading.present();
  }


  submit_enquiry() {
    console.log(this.form);
    this.form.product_id=this.product_id;

    if(this.validations_form.invalid)
    {
      this.validations_form.get('company').markAsTouched();
      this.validations_form.get('fname').markAsTouched();
      this.validations_form.get('lname').markAsTouched();
      this.validations_form.get('email').markAsTouched();
      this.validations_form.get('phone').markAsTouched();
      this.validations_form.get('state').markAsTouched();
      this.validations_form.get('city').markAsTouched();
      this.validations_form.get('enquiry').markAsTouched();
      // this.validations_form.get('user').markAsTouched();
      return;
    }
    console.log(this.form);

    this.service.submit_enquiry(this.form).then((response:any)=>{
      console.log(response);
      this.form={company:'',fname:'',lname:'',email:'',phone:'', state:'',city:'',enquiry:'',product_id:''};
      let toast = this.toastCtrl.create({
          message: 'Your Enquiry Submitted Successfully!',
          duration: 3000
        });
        toast.present();
       
      this.navCtrl.push(HomePage,{response:response});
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EnquiryPage');
  }

  goToSearch(){
    this.navCtrl.push(SearchPage)
  }

}
