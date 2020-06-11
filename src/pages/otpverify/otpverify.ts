import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController, Loading, Platform, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { LoginserviceProvider } from '../../providers/loginservice/loginservice';
import { TabsPage } from '../tabs/tabs';
import { DashboardPage } from '../dashboard/dashboard';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { LocationAccuracy} from '@ionic-native/location-accuracy';
import { CatalougePage } from '../catalouge/catalouge';
import { HomePage } from '../home/home';

// import { AndroidPermissions } from '@ionic-native/android-permissions';
declare var SMS: any;

@IonicPage()
@Component({
  selector: 'page-otpverify',
  templateUrl: 'otpverify.html',
})
export class OtpverifyPage {
  
  loading: Loading;
  otp_values = {one: '', two: '', three: '', four: '', five: '', six: ''};
  otpCredentials = { otp: '', mobile: '', mobile_no: ''};
  cred_detail:any=[];
  temp_arr:any=[];
  otp_value:any=[];
  show_message:boolean=false;
  notification_token:any='';
  disable_resend_button:boolean=false;
  final_time:any;
  interval_1:any;
  interval_2:any;
  last_page:any;
  arr:any;
  keycode:any;
  registration_data:any={};
  login_page:any;
  role:any;
  data_value = {};
  
  public data = { mobile: '', otp:0};
  public data2 = { mobile: ''};
  test:any;
  otp:number;
  
  otpForm: FormGroup;
  otp_data:any={};
  
  equalto(field_name): ValidatorFn {
    
    return (control: AbstractControl): {[key: string]: any} => {
      
      let input = control.value;
      
      let isValid=control.root.value[field_name]==input
      if(!isValid)
      return { 'equalTo': {isValid} }
      else
      return null;
    };
  }
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public serv: LoginserviceProvider, public formBuilder: FormBuilder, public storage: Storage, public toastCtrl: ToastController, public platform: Platform,  public zone: NgZone, public backgroundlocation: BackgroundGeolocation, public locationAccuracy: LocationAccuracy, public events: Events) {
    
    
    this.data_value = navParams.get('data');
    this.otp_data = navParams.get('otp_data');
    
    
    console.log(this.data_value);
    
    this.otpForm = formBuilder.group({
      one: ['', Validators.compose([Validators.required])],
      two: ['', Validators.compose([Validators.required])],
      three: ['', Validators.compose([Validators.required])],
      four: ['', Validators.compose([Validators.required])],
      five: ['', Validators.compose([Validators.required])],
      six: ['', Validators.compose([Validators.required])]
    });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad OtpverifyPage');
    this.platform.ready().then((readySource) =>
    {
      console.log("Platform Ready");
      
      var str= this.otp_value;
      var arr = (""+str).split("");
      console.log(arr);
      
    })
  }
  
  ionViewWillLeave(){
    clearInterval(this.interval_1);
    clearInterval(this.interval_2);
  }
  
  ionViewWillEnter() {
    
  }
  
  
  
  verify_otp() 
  {
    console.log(this.otp_values);
    console.log(this.otpCredentials.otp);
    
    if(this.data_value['otp'] == this.otpCredentials.otp)
    { 
      this.serv.login_submit(this.data_value).then((result:any)=>{
        console.log(result);
        if(result)
        {
          if(result.user_type =='OFFICE' || result.user_type =='office' || result.user_type =='Office')
          {
            this.navCtrl.push(TabsPage);
          }
          else if(this.data_value['login_type'] == "Plumber")
          {
            this.navCtrl.push(TabsPage);
          }
          else if(this.data_value['login_type'] == "Distributor")
          {
            this.navCtrl.push(HomePage);
          }
          else
          {
            this.navCtrl.push(DashboardPage);
          }
        }
        
      });
      
    }
    
    else{
      let alert = this.alertCtrl.create({
        subTitle: 'OTP do not match',
        buttons: ['Try Again']
      });
      alert.present();
      console.log('otp not match');
    }
    
  }
  
  my_search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
      if (myArray[i].PatientId === nameKey) {
        return myArray[i];
      }
    }
  }
  
  resend_otp(){
    for (var key in this.otp_values) {
      this.otp_values[key] = '';
    }
  }
  
  showLoginError() {
    
    let alert = this.alertCtrl.create({
      title: 'Alert!',
      message: 'This number is not registered with Asian Hospital. Please register to continue.',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Register',
          handler: () => {
            console.log('Ok clicked');
          }
        }
      ]
    });
    alert.present();
  }
  
  inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
      if(haystack[i] == needle) return true;
    }
    return false;
  }
  
  showError(text) {
    
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
  
  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img class="rotate h65" src="assets/imgs/logo-icon.png" />`,
      dismissOnPageChange: true
    });
    this.loading.present();
  }
  
  showSuccess(text) {
    
    let alert = this.alertCtrl.create({
      title: 'Success!',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
  
  
  moveFocus(nextElement,previousElement,ev) {
    console.log(ev);
    this.keycode = ev.keyCode;
    console.log(nextElement);
    if(ev.keyCode != 8 && nextElement)
    {
      nextElement.setFocus();
    }
    if(ev.keyCode == 8 && previousElement)
    {
      console.log(previousElement);
      previousElement.setFocus();
    }
  }
  
  check_otp() {
    
    this.otpCredentials.otp='';
    for (var key in this.otp_values) {
      this.otpCredentials.otp += parseInt(this.otp_values[key]);
    }
    console.log(this.otpCredentials);
    if(this.allTrue(this.otp_values))
    {
      this.verify_otp();
    }
  }
  
  allTrue(obj) {
    for(var o in obj)
    if(!obj[o]) return false;
    
    return true;
  }
  
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  
}
