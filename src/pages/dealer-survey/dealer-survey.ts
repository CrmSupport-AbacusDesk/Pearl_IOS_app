import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Navbar, AlertController } from 'ionic-angular';
import { EnquiryserviceProvider } from '../../providers/enquiryservice/enquiryservice';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ViewChild } from '@angular/core';
import { DealerSurveyListPage } from '../dealer-survey-list/dealer-survey-list';

@IonicPage()
@Component({
  selector: 'page-dealer-survey',
  templateUrl: 'dealer-survey.html',
})
export class DealerSurveyPage {
  
  @ViewChild(Navbar) navBar: Navbar;
  
  
  lead_form:any = {};
  state_list:any=[];
  city_list:any=[];
  data:any={};
  contact_person={};
  city_name:any=[];
  channel_partner_list:any=[];
  
  validateForm: FormGroup;
  type:any = '';
  title:any = '';
  order:any = '';
  dealer_dr_id:any='';
  dealer_data:any=[];
  dr_id:any;
  dealer_survey_detail:any=[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public service:EnquiryserviceProvider,public loadingCtrl: LoadingController, public serve: MyserviceProvider, public formBuilder: FormBuilder, public toastCtrl: ToastController, public alertCtrl: AlertController) 
  {  
    this.dr_id = this.navParams.get('dr_id');
    
    if(this.dr_id)
    {
      this.serve.addData({'dr_id':this.dr_id},'distributor/dealer_survey_detail').then((result)=>{
        console.log(result);
        this.dealer_survey_detail = result;
        
        this.data = this.dealer_survey_detail;
        this.data.whatsapp = this.dealer_survey_detail.whatsapp_no;
        this.data.product_rating = this.dealer_survey_detail.product_rating;
        this.data.demonstration_response = this.dealer_survey_detail.demonstration_response;
        this.data.distributor_name = this.dealer_survey_detail.dealer_channel_partner;
        this.data.distributor_ref = this.dealer_survey_detail.ref_channel_partner;
        this.data.distributor_ref_mobile = this.dealer_survey_detail.ref_channel_partner_mobile;
        
        this.data.state = {'state_name':this.dealer_survey_detail.state};
        this.data.district = {'district_name':this.dealer_survey_detail.district};
        this.data.city = {'city':this.dealer_survey_detail.city};
      }); 
    }
    
    this.validateForm = formBuilder.group({
      companyName: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      email: [''],
      mobile: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      whatsapp: ['',Validators.compose([Validators.minLength(10), Validators.maxLength(10)])],
      product_rating: [''],
      demonstration_response: [''],
      order: [''],
      remark: [''],
      distributor_name: [''],
      distributor_ref: [''],
      distributor_ref_mobile: [''],
      address: ['', Validators.compose([Validators.required])],
      stateName: ['', Validators.compose([Validators.required])],
      districtName: ['', Validators.compose([Validators.required])],
      pincode: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],
      city: ['', Validators.compose([Validators.required])],
    });
    
    this.getState();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDealerPage');
  }
  
  portChange(event: {
    component: IonicSelectableComponent,
    value: any 
  }) {
    console.log('port:', event.value);
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
  
  district_list:any = [];
  
  getDistrict(state) {
    console.log(state);
    
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });
    
    this.service.getCity(state).then((response:any)=>{
      loading.dismiss();
      console.log(response);
      this.district_list = response;
    });
    loading.present();
  }
  
  check_mobile:any = '';
  
  check_mobile_existence(mobile)
  {
    this.serve.addData({'mobile':mobile},'Enquiry/check_mobile_existence').then((result)=>{
      console.log(result);
      this.check_mobile = result['check_mobile'];
    }) 
  }  
  
  get_pincode_area_name(pincode)
  {
    this.service.get_pincode_city_name(pincode).then((response:any)=>{
      console.log(response);
      if(response=='' || response==null)
      {
        this.city_name = "Not Matched";
      }
      else
      {
        this.city_name = response.city;
        this.data.state = {'state_name':response.state_name};
        this.data.district = {'district_name':response.district_name};
        this.data.city = {'city':response.city};
      }
    });
  }
  
  
  getCity(state,district) {
    console.log(state);
    console.log(district);
    
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });
    
    this.service.getCity1({'state':state,'district':district}).then((response:any)=>{
      loading.dismiss();
      console.log(response);
      this.city_list = response;
    });
    loading.present();
  }
  
  getArea(state,district,city) {
    console.log(state);
    
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });
    
    this.service.getCity({'state':state,'district':district, 'city':city}).then((response:any)=>{
      loading.dismiss();
      console.log(response);
      this.city_list = response;
    });
    loading.present();
  }
  
  
  getPincode(state,district,city,area) {
    console.log(state);
    
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });
    
    this.service.getCity({'state':state,'district':district, 'city':city, 'area':area}).then((response:any)=>{
      loading.dismiss();
      console.log(response);
      this.city_list = response;
    });
    loading.present();
  }
  
  MobileNumber(event: any) 
  {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) 
    {event.preventDefault(); }
  }
  
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Lead Added Successfully',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
  
  
  presentToast1() {
    let toast1 = this.toastCtrl.create({
      message: 'Survey Added Successfully',
      duration: 3000,
      position: 'bottom'
    });
    toast1.present();
  }
  
  data1:any=[];
  loading:any = "0";
  order_data:any = [];
  
  submit_function:boolean = false;
  
  submit()
  {
    console.log(this.data);
    this.lodingPersent();
    
    if(this.validateForm.invalid)
    {
      this.validateForm.get('companyName').markAsTouched();
      this.validateForm.get('name').markAsTouched();
      this.validateForm.get('mobile').markAsTouched();
      this.validateForm.get('stateName').markAsTouched();
      this.validateForm.get('districtName').markAsTouched();
      this.validateForm.get('pincode').markAsTouched();
      this.validateForm.get('city').markAsTouched();
      this.validateForm.get('address').markAsTouched();
      // this.validateForm.get('email').markAsTouched();
      
      return;
    }
    
    this.data.state = this.data.state.state_name;
    this.data.district = this.data.district.district_name;
    this.data.city = this.data.city.city;
    
    if(this.submit_function == false)
    {
      this.submit_function = true;
      
      if(this.dr_id)
      {
        this.serve.addData({'data':this.data},"Distributor/update_dealer_survey").then(response=>{
          console.log(response);
          this.navCtrl.pop();
        });
        this.loading.dismiss();
      }
      else
      {
        this.serve.addData({'survey_data':this.data},"Distributor/add_dealer_survey").then(response=>{
          console.log(response);
          if(response['msg'] == 'success'){
            
            this.navCtrl.pop();
            this.presentToast1();
          }
        });
        this.loading.dismiss();
      }
    }
  }
  
  
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: 'Mobile No. Already Exists',
      buttons: ['Ok']
    });
    alert.present();
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
