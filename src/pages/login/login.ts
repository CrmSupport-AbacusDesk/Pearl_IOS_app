import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController ,AlertController, Platform,Nav} from 'ionic-angular';
import { LoginserviceProvider } from '../../providers/loginservice/loginservice';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { EnquiryPage } from '../enquiry/enquiry';
import { OtpverifyPage } from '../otpverify/otpverify';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { SelectRegistrationTypePage } from '../select-registration-type/select-registration-type';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  @ViewChild(Nav) nav: Nav;
  
  
  validations_form: FormGroup;
  register_type:any = {};
  rootPage:any;
  
  
  
  form ={ phone:'', otp:0,type:'' };
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public service:LoginserviceProvider, 
    public FormBuilder: FormBuilder,
    public LoadingCtrl:LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController, 
    public locationAccuracy: LocationAccuracy, 
    public platform: Platform, public loadingCtrl: LoadingController ) {
      
      
      this.register_type = this.navParams.get('registerType1');
      console.log(this.register_type);
      
      this.validations_form = FormBuilder.group({
        phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
        
      })
      
    }
    
    loading:any = "0";
    
    
    loading1:any;
    lodingPersent()
    {
      this.loading1 = this.loadingCtrl.create({
        spinner: 'hide',
        content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
      });
      this.loading1.present();
    }
    
    login_submit() 
    { 
      if(this.register_type == undefined || (this.register_type.name == "Plumber" && this.register_type.id == "4"))
      {
        console.log("aaaaaaaaaaaa");
        
        this.lodingPersent();
        
        if(this.validations_form.invalid) 
        {  
          this.validations_form.get('phone').markAsTouched();
          return;
        }
        
        if(this.form.phone == '9319180958')
        {
          this.form.otp = 123456;
        }
        else
        {
          this.form.otp = Math.floor(100000 + Math.random() * 900000);
        }
        
        if(this.register_type == undefined)
        {
          this.form['login_type'] = 'Sales_user';
        }
        else
        {
          this.form['login_type'] = 'Plumber';
        }
        
        if(this.register_type!= undefined && this.register_type.id == "4")
        {
          this.service.otp_send(this.form).then((response:any)=>
          {
            console.log(response);
            this.loading1.dismiss();
            if(response['msg'] == "notExist")
            {
              this.navCtrl.push(SignupPage,{data:this.form});
            }
            else
            {
              this.navCtrl.push(OtpverifyPage,{data:this.form, otp_data:response['data']});
            }
          });
        }
        else
        {
          this.service.otp_send(this.form).then((response:any)=>{
            if(response['msg'] == 'exist') 
            {  
              this.loading1.dismiss();
              this.navCtrl.push(OtpverifyPage,{data:this.form, otp_data:response['data']});
            } 
            else 
            {  
              let alert = this.alertCtrl.create({
                subTitle: 'Mobile Not Registered',
                buttons: ['OK']
              });
              alert.present();
              this.loading1.dismiss();
            }
          });
        }
        
        this.loading = "0";
      }
      
      if(this.register_type != undefined && (this.register_type.name != "Plumber" && this.register_type.id != "4") && (this.register_type.name == "Distributor" && this.register_type.id == "1"))
      { 
        console.log("bbbbbbbbbbbbbb");
        
        if(this.validations_form.invalid) 
        {  
          this.validations_form.get('phone').markAsTouched();
          return;
        }
        
        if(this.form.phone == '8802777056')
        {
          this.form.otp = 123456;
        }
        else
        {
          this.form.otp = Math.floor(100000 + Math.random() * 900000);
        }
        
        this.form['login_type'] = 'Distributor';
        
        this.form.type = this.register_type.id;
        console.log(this.form);
        
        this.service.otp_send(this.form).then((response:any)=>
        {
          console.log(response);
    
          if(response['msg'] == "notExist")
          {
            this.navCtrl.push(SignupPage,{data:this.form});
          }
          else
          {
            this.navCtrl.push(OtpverifyPage,{data:this.form, otp_data:response['data']});
          }
        });
        
        // this.service.product_cataloue_app(this.form).then((response:any)=>
        // {
        //   if(response['msg'] == 'exist') 
        //   {
        //     this.navCtrl.push(TabsPage);
        //   } 
        //   else 
        //   {  
        //     let alert = this.alertCtrl.create({
        //       subTitle: 'Mobile Not Registered',
        //       buttons: ['OK']
        //     });
        //     alert.present();
        //     this.loading1.dismiss();
        //   }
        // });
        
        this.loading = "0";
      }
      
      if(this.register_type != undefined && (this.register_type.name != "Plumber" && this.register_type.id != "4") && (this.register_type.name != "Distributor" && this.register_type.id != "1"))
      {
        console.log("cccccccccccccc");
        
        console.log("222");
        
        console.log('undefined');
        
        if(this.validations_form.invalid) 
        {  
          this.validations_form.get('phone').markAsTouched();
          return;
        }
        
        this.form.type = this.register_type.id;
        console.log(this.form);
        
        this.service.product_cataloue_app(this.form).then((response:any)=>
        {
          if(response['msg'] == 'exist') 
          {
            this.navCtrl.push(TabsPage);
          } 
          else 
          {  
            let alert = this.alertCtrl.create({
              subTitle: 'Mobile Not Registered',
              buttons: ['OK']
            });
            alert.present();
            this.loading1.dismiss();
          }
        });
        
        this.loading = "0";
      }
      
      
    }
    
    showError() {
      
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'Please enter correct Mobile!',
        buttons: ['OK']
      });
      alert.present();
    }
    
    
    
    ionViewDidLoad() {
      console.log('ionViewDidLoad LoginPage');
    }
    
    homePage()
    {
      this.navCtrl.push(SelectRegistrationTypePage);
    }
    
    
    register()
    {
      console.log('register');
      
      this.navCtrl.push(SignupPage,{'registerType':this.register_type});
    }
    
  }
  