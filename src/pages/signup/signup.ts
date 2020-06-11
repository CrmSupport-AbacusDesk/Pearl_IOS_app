import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ActionSheetController, Platform } from 'ionic-angular';
import { EnquiryserviceProvider } from '../../providers/enquiryservice/enquiryservice';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { TabsPage } from '../tabs/tabs';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { OtpverifyPage } from '../otpverify/otpverify';
import { LoginserviceProvider } from '../../providers/loginservice/loginservice';

/**
* Generated class for the SignupPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  
  state_list:any=[];
  city_list:any=[];
  data:any={};
  contact_person={};
  
  registerTypeList: any = [];
  city_name:any=[];
  validateForm: FormGroup;
  myphoto:any;
  form:any={};
  mobile_no:any;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams, 
    public service: EnquiryserviceProvider, 
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public storage: Storage,
    public events: Events,
    public serve:MyserviceProvider, public actionSheetCtrl: ActionSheetController, private platform: Platform, private camera: Camera,public otp_service:LoginserviceProvider) {
      
      this.validateForm = formBuilder.group({
        companyName: [''],
        name: ['', Validators.compose([Validators.required])],
        email: [''],
        mobile: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
        whatsapp: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10)])],
        paytm_mobile_no: [''],
        gst: [''],
        address: ['', Validators.compose([Validators.required])],
        stateName: ['', Validators.compose([Validators.required])],
        districtName: ['', Validators.compose([Validators.required])],
        pincode: ['', Validators.compose([Validators.required , Validators.minLength(6), Validators.maxLength(6)])],
        city: ['', Validators.compose([Validators.required])],
        dob: [''],
        anniversary_date: [''],
        dealer_name: [''],
        dealer_mobile: [''],
        distributor_name: [''],
        doc_number :[''],
        doc_type :['']
      });
      this.data.registerType = {};
      
      this.mobile_no = this.navParams.get('data');
      console.log(this.mobile_no);
      
      if(this.mobile_no)
      {
        this.data.registerType['name'] = 'Plumber';
        this.data.registerType['id'] = '4';
        this.data.mobile = this.mobile_no.phone;
      }
      else
      {
        this.data.registerType = this.navParams.get('registerType');
      }
      this.typeChange();
    }
    
    ionViewDidLoad() {
      console.log('ionViewDidLoad SignupPage');
      this.getCustomerType();
      this.getState();
    }
    
    
    getCustomerType() {
      
      this.service.getCustomerType().then((response:any)=>{
        console.log(response);
        this.registerTypeList = response.roleData; 
      });
      
    }
    
    typeChange() {
      console.log(this.data.registerType);
      
      if(this.data.registerType['name'] == 'Plumber' || this.data.registerType['name'] == 'Consumer') {
        const companyName = this.validateForm.get('companyName');
        companyName.clearValidators();
        companyName.updateValueAndValidity();
      } 
      else if(this.data.registerType['name'] == 'Plumber')
      {
        const paytmMobile = this.validateForm.get('paytm_mobile_no');
        paytmMobile.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
        paytmMobile.updateValueAndValidity();
        
        const docType = this.validateForm.get('doc_type');
        docType.setValidators([Validators.required]);
        docType.updateValueAndValidity();
        
        const docNumber = this.validateForm.get('doc_number');
        docNumber.setValidators([Validators.required]);
        docNumber.updateValueAndValidity();
      }
      else 
      {
        const companyName = this.validateForm.get('companyName');
        companyName.setValidators([Validators.required]);
        companyName.updateValueAndValidity();
        
        const paytmMobile = this.validateForm.get('paytm_mobile_no');
        companyName.clearValidators();
        paytmMobile.updateValueAndValidity();
        
        const docType = this.validateForm.get('doc_type');
        companyName.clearValidators();
        docType.updateValueAndValidity();
        
        const docNumber = this.validateForm.get('doc_number');
        companyName.clearValidators();
        docNumber.updateValueAndValidity();
      }
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
    
    
    check_gst:any = '';
    gst_details:any = [];
    
    check_gst_existence(gst)
    {
      
      this.serve.addData({'gst':gst},'Enquiry/check_gst_existence').then((result)=>{
        console.log(result);
        this.check_gst = result['check_gst'];
        console.log(this.check_gst);
        this.gst_details = result['data'];
        console.log(this.gst_details);
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
    
    submit_function:boolean = false;
    
    submitDetail()
    {
      console.log(this.data);
      
      console.log(this.validateForm);
      
      if(this.validateForm.invalid)
      {
        if(this.data.registerType.name=='Distributor' || this.data.registerType.name=='Dealer')
        {
          this.validateForm.get('companyName').markAsTouched();
          this.validateForm.get('gst').markAsTouched();
        }
        
        this.validateForm.get('name').markAsTouched();
        this.validateForm.get('mobile').markAsTouched();
        this.validateForm.get('pincode').markAsTouched();
        this.validateForm.get('address').markAsTouched();
        this.validateForm.get('stateName').markAsTouched();
        this.validateForm.get('districtName').markAsTouched();
        this.validateForm.get('city').markAsTouched();
        
        // if(this.data.registerType.name=='Distributor')
        // {
        //   this.validateForm.get('whatsapp').markAsTouched();
        // }
        
        if(this.data.registerType.name=='Plumber')
        {
          this.validateForm.get('dealer_mobile').markAsTouched();
          this.validateForm.get('dealer_name').markAsTouched();
          this.validateForm.get('paytm_mobile_no').markAsTouched();
          this.validateForm.get('doc_type').markAsTouched();
          this.validateForm.get('doc_number').markAsTouched();
        }  
        return;
      }
      this.data.doc_img = this.myphoto;
      
      if(this.submit_function == false)
      {
        this.submit_function = true;
        
        this.serve.addData(this.data,"Login/registerUser").then(response=>
          {
            console.log(response);
            
            if(this.data.registerType['id'] == '4')
            {
              this.form['login_type'] = 'Plumber';
              this.form.otp = Math.floor(100000 + Math.random() * 900000);
              this.form.phone = this.mobile_no.phone;
              
              this.otp_service.otp_send(this.form).then((response:any)=>
              {
                console.log(response);
                this.navCtrl.push(OtpverifyPage,{data:this.form, otp_data:response['data']});
              });
            } 
            else
            {
              if(response && response['token']) {
                
                this.storage.set('token', response['token']);
                this.storage.set('role', response['role']);
                this.storage.set('displayName', response['displayName']);
                this.storage.set('type', response['type']);
                this.events.publish('token_val',true);
                this.events.publish('userLoggedRole', response['role']);
                this.events.publish('userLoggedDisplayName', response['displayName']);
                this.navCtrl.push(TabsPage);
                
              } 
              else 
              {  
                let toast = this.toastCtrl.create({
                  message: 'Something Went Wrong, Try Later!',
                  duration: 2000
                });
                toast.present();
              }
            }
            
          });
        }
      }
      
      tmp_contact:any=[];
      addContact()
      {
        this.tmp_contact.push(this.contact_person);
        console.log(this.tmp_contact);
        this.contact_person={};
      }
      
      presentActionSheet() 
      {
        let actionSheet = this.actionSheetCtrl.create({
          buttons: [
            {
              text: 'Open Camera',
              role: 'Camera',
              handler: () => {
                this.take();
              }
            },
            {
              text: 'Open Gallery',
              handler: () => {
                this.get_image();
              }
            },
          ]
        });
        actionSheet.present();
      }
      
      take(){
        if (this.platform.is('cordova')) {
          const options: CameraOptions = {
            quality: 70,
            targetHeight: 400,
            targetWidth: 400,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            allowEdit: true,
          }
          
          this.camera.getPicture(options).then((imageData) => {
            this.myphoto = 'data:image/jpeg;base64,' + imageData;
          }).catch((err) => {
            console.log("Error: ", err);
          });
          
        }
      }
      
      get_image(){
        if (this.platform.is('cordova')) {
          const options: CameraOptions = {
            quality: 70,
            targetHeight: 400,
            targetWidth: 400,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum:false,
            correctOrientation: true,
            allowEdit: true,
          }
          
          this.camera.getPicture(options).then((imageData) => {
            this.myphoto = 'data:image/jpeg;base64,' + imageData;
          }).catch((err) => {
            console.log("Error: ", err);
          });
          
        }
      }
      
    }
    