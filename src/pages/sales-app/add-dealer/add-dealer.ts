import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Navbar, AlertController, ActionSheetController, Platform } from 'ionic-angular';
import { EnquiryserviceProvider } from '../../../providers/enquiryservice/enquiryservice';
import { MyserviceProvider } from '../../../providers/myservice/myservice';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicSelectableComponent } from 'ionic-selectable';
import { AddCheckinPage } from '../add-checkin/add-checkin';
import { ViewChild } from '@angular/core';
import { AddOrderPage } from '../../add-order/add-order';
import { DealerListPage } from '../dealer-list/dealer-list';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { ConstantProvider } from '../../../providers/constant/constant';


@IonicPage()
@Component({
  selector: 'page-add-dealer',
  templateUrl: 'add-dealer.html',
})
export class AddDealerPage {
  
  @ViewChild(Navbar) navBar: Navbar;
  
  
  lead_form:any = {};
  state_list:any=[];
  city_list:any=[];
  data:any={};
  contact_person={};
  city_name:any=[];
  channel_partner_list:any=[];
  myphoto:any;
  validateForm: FormGroup;
  type:any = '';
  title:any = '';
  order:any = '';
  dealer_dr_id:any='';
  dealer_data:any=[];
  mobileEdit:boolean = false;
  countryList:any=[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public service:EnquiryserviceProvider,public loadingCtrl: LoadingController, public serve: MyserviceProvider, public formBuilder: FormBuilder, public toastCtrl: ToastController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, private platform: Platform, private camera: Camera, private transfer: FileTransfer, public constant : ConstantProvider) 
  {
    this.type = this.navParams.get('type');
    console.log(this.type);
    
    if(this.type == 1)
    {
      this.title = 'Channel Partner';
    }
    
    if(this.type == 3)
    {
      this.title = 'Dealer';
    }
    
    if(this.type == 7)
    {
      this.title = 'Direct Dealer'
    }
    
    
    if(this.navParams.get('user_type'))
    { 
      this.order = this.navParams.get('user_type');
      this.type = this.navParams.get('user_type');
      this.title = 'Dealer';
    }
    
    
    this.dealer_dr_id = this.navParams.get('dr_id');
    
    if(this.dealer_dr_id)
    {
      this.serve.addData({'dr_id':this.dealer_dr_id},'Distributor/lead_detail').then((result)=>{
        console.log(result);
        this.dealer_data = result['result'];
        this.data = this.dealer_data;
        this.data.channel_partner_name = this.dealer_data.dealer_channel_partner;
        this.data.whatsapp = this.dealer_data.whatsapp_no;
        if(this.dealer_data.date_of_birth != '0000-00-00') this.data.dob = this.dealer_data.date_of_birth;
        if(this.dealer_data.date_of_anniversary != '0000-00-00') this.data.anniversary_date = this.dealer_data.date_of_anniversary;
        
        this.city_name = this.dealer_data.city;
        this.data.state = {'state_name':this.dealer_data.state};
        this.data.district = {'district_name':this.dealer_data.district};
        this.data.city = {'city':this.dealer_data.city};
        this.data.country = {'country_name':this.dealer_data.country};
        
        if(this.dealer_data.mobile) this.mobileEdit = true;
      }); 
    }
    
    
    
    this.validateForm = formBuilder.group({
      companyName: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      mobile: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      whatsapp: ['',Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      gst: ['', Validators.compose([Validators.minLength(15), Validators.maxLength(15)])],
      dob: [''],
      product_rating: [''],
      demonstration_response: [''],
      anniversary_date: [''],
      channel_partner_name: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      country: ['India', Validators.compose([Validators.required])],
      stateName: ['', Validators.compose([Validators.required])],
      districtName: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      pincode: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],
      
    });
    this.getCountryList();
    this.getState();
    this.get_assign_channel_partner();
    
    this.data.country = {'country_name':'India'};
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDealerPage');
    this.navBar.backButtonClick = (e:UIEvent)=>{
      // todo something
      this.navCtrl.push(AddCheckinPage);
    }
  }
  getCountryList()
  {
    this.serve.addData({},'Distributor/country_list').then((result)=>{
      console.log(result);
      this.countryList=result;      
    })
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
  
  
  getDistrict(state) 
  {
    this.data.district = '';
    this.data.city = '';
    this.district_list = [];
    this.city_list = [];
    
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
  
  check_gst:any = '';
  gst_details:any = [];
  check_mobile:any = '';
  
  
  
  check_mobile_existence(mobile)
  {
    if(String(mobile).length == 10)
    {
      this.serve.addData({'mobile':mobile, 'type':3},'Enquiry/check_mobile_existence').then((result)=>{
        console.log(result);
        this.check_mobile = result['check_mobile'];
      }) 
    }
    
  }
  
  
  check_gst_existence(gst)
  {
    this.serve.addData({'gst':gst},'Enquiry/check_gst_existence').then((result)=>{
      console.log(result);
      this.check_gst = result['check_gst'];
      this.gst_details = result['data'];
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
    this.data.city = '';
    this.city_list = [];
    
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
  
  
  category_list:any = [];
  get_category()
  {
    this.serve.addData({'type':this.type},'Distributor/discount_category').then((result)=>{
      console.log(result);
      this.category_list = result;
      console.log(this.category_list);
    })
  }
  
  get_assign_channel_partner()
  {
    this.serve.addData('','Distributor/get_assign_channel_partner').then((result)=>{
      console.log(result);
      this.channel_partner_list = result;
    })
  }
  
  
  MobileNumber(event: any) 
  {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) 
    {event.preventDefault(); }
  }
  
  typeChange(country) 
  {  
    console.log(country);
    
    this.data.state = '';
    this.data.district = '';
    this.data.city = '';
    this.data.pincode = '';
    this.district_list = [];
    this.city_list = [];
    
    if(country == 'India') 
    {
      const stateName = this.validateForm.get('stateName');
      stateName.setValidators([Validators.compose([Validators.required])]);
      stateName.updateValueAndValidity();
      
      const districtName = this.validateForm.get('districtName');
      districtName.setValidators([Validators.compose([Validators.required])]);
      districtName.updateValueAndValidity();
      
      const city = this.validateForm.get('city');
      city.setValidators([Validators.compose([Validators.required])]);
      city.updateValueAndValidity();
      
      const pincode = this.validateForm.get('pincode');
      pincode.setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
      pincode.updateValueAndValidity();
    } 
    else
    {
      const stateName = this.validateForm.get('stateName');
      stateName.clearValidators();
      stateName.updateValueAndValidity();
      
      const districtName = this.validateForm.get('districtName');
      districtName.clearValidators();
      districtName.updateValueAndValidity();
      
      const city = this.validateForm.get('city');
      city.clearValidators();
      city.updateValueAndValidity();
      
      const pincode = this.validateForm.get('pincode');
      pincode.clearValidators();
      pincode.updateValueAndValidity();
    }
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
      message: 'Dealer Added Successfully',
      duration: 3000,
      position: 'bottom'
    });
    
    toast1.present();
  }
  
  data1:any=[];
  order_data:any = [];
  
  submitDealer()
  { 
    console.log(this.validateForm);
    
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
      // this.validateForm.get('gst').markAsTouched();
      this.validateForm.get('whatsapp').markAsTouched();
      this.validateForm.get('channel_partner_name').markAsTouched();
      this.validateForm.get('email').markAsTouched();
      this.validateForm.get('country').markAsTouched();
      return;
    }
    
    this.data.type = this.type;
    this.data.visitingCardImg = this.myphoto;
    
    if(this.dealer_dr_id)
    {
      this.serve.addData({'data':this.data},"Distributor/update_dealer").then(response=>{
        console.log(response);
        
        if(this.image)
        {        
          const fileTransfer: FileTransferObject = this.transfer.create();
          var random = new Date().getTime() + Math.floor(Math.random() * 100);
          let options: FileUploadOptions = 
          {
            fileKey: 'photo',
            fileName: "myImage_" + random + ".jpg",
            chunkedMode: false,
            mimeType: "image/jpeg",
          }
          
          fileTransfer.upload(this.image, this.constant.updateVisitingCard+'visitingCardImage?id='+this.dealer_dr_id, options)
          .then((data) => 
          {
            console.log(data);          
          });
        }
        
        this.navCtrl.setRoot(DealerListPage);
      });
    }
    else
    {
      if(this.data.country && this.data.country.country_name=='India')
      {
        this.data.state = this.data.state && this.data.state.state_name ? this.data.state.state_name : '';
        this.data.district = this.data.district && this.data.district.district_name ? this.data.district.district_name : '';
        this.data.city = this.data.city && this.data.city.city ? this.data.city.city : '';
      }
      
      let loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
      });
      
      loading.present();
      
      this.serve.addData({'data':this.data},"Distributor/add_dealer").then(response=>{
        
        console.log(response);
        loading.dismiss();
        
        if(response['msg'])
        {
          this.data = {};
          this.validateForm.reset();
          
          if(this.image)  {
            
            const fileTransfer: FileTransferObject = this.transfer.create();
            var random = new Date().getTime() + Math.floor(Math.random() * 100);
            let options: FileUploadOptions = 
            {
              fileKey: 'photo',
              fileName: "myImage_" + random + ".jpg",
              chunkedMode: false,
              mimeType: "image/jpeg",
            }
            
            fileTransfer.upload(this.image, this.constant.updateVisitingCard+'visitingCardImage?id='+response['msg'], options)
            .then((data) => 
            {
              console.log(data);          
            });
          }
          
          if(this.order != undefined)
          {
            this.order_data = response['data'];
            this.navCtrl.push(AddOrderPage,{'order_data':this.order_data,'brand_assign':[],'user_data':this.order_data,'user_detail':this.order_data});
            this.presentToast1();
          }
          
          if(this.order == undefined)
          {
            this.data1 = response['data'];
            this.navCtrl.push(AddCheckinPage,{'data':this.data1});
            this.presentToast();
          }
          
        }
      });
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
  
  // presentActionSheet() 
  // {
  //   let actionSheet = this.actionSheetCtrl.create({
  //     buttons: [
  //       {
  //         text: 'Open Camera',
  //         role: 'Camera',
  //         handler: () => {
  //           this.take();
  //         }
  //       },
  //       {
  //         text: 'Open Gallery',
  //         handler: () => {
  //           this.get_image();
  //         }
  //       },
  //     ]
  //   });
  //   actionSheet.present();
  // }
  
  // take()
  // {
  //   if (this.platform.is('cordova')) 
  //   {
  //     const options: CameraOptions = {
  //       quality: 70,
  //       targetHeight: 400,
  //       targetWidth: 400,
  //       destinationType: this.camera.DestinationType.DATA_URL,
  //       encodingType: this.camera.EncodingType.JPEG,
  //       mediaType: this.camera.MediaType.PICTURE,
  //       correctOrientation: true,
  //       allowEdit: true,
  //     }
  
  //     this.camera.getPicture(options).then((imageData) => {
  //       this.myphoto = 'data:image/jpeg;base64,' + imageData;
  //     }).catch((err) => {
  //       console.log("Error: ", err);
  //     });
  //   }
  // }
  
  // get_image()
  // {
  //   if (this.platform.is('cordova')) 
  //   {
  //     const options: CameraOptions = {
  //       quality: 70,
  //       targetHeight: 400,
  //       targetWidth: 400,
  //       destinationType: this.camera.DestinationType.DATA_URL,
  //       sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
  //       saveToPhotoAlbum:false,
  //       correctOrientation: true,
  //       allowEdit: true,
  //     }
  
  //     this.camera.getPicture(options).then((imageData) => {
  //       this.myphoto = 'data:image/jpeg;base64,' + imageData;
  //     }).catch((err) => {
  //       console.log("Error: ", err);
  //     });
  //   }
  // }
  
  cam:any;
  gal:any;
  cancl:any;
  image:any;
  
  open_camera()
  {
    let actionsheet = this.actionSheetCtrl.create(
      {
        title:"Select An Option",
        cssClass: 'cs-actionsheet',
        
        buttons:[{
          cssClass: 'sheet-m',
          text: 'Open Camera',
          icon:'camera',
          handler: () => {
            console.log("Camera Clicked");
            this.takePhoto();
          }
        },
        {
          cssClass: 'sheet-m1',
          text: 'Open Gallery',
          icon:'image',
          handler: () => {
            console.log("Gallery Clicked");
            this.getImage();
          }
        },
        {
          cssClass: 'cs-cancel',
          text: this.cancl,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionsheet.present();
  }
  
  takePhoto()
  {
    console.log("i am in camera function");
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth : 500,
      targetHeight : 400
    }
    
    console.log(options);
    this.camera.getPicture(options).then((imageData) => {
      console.log(imageData);
      this.image = 'data:image/jpeg;base64,' + imageData;
      console.log(this.image);
      // this.save_picture();
    });
  }
  getImage() 
  {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }
    console.log(options);
    this.camera.getPicture(options).then((imageData) => {
      console.log(imageData);
      this.image = 'data:image/jpeg;base64,' + imageData;
      console.log(this.image);
      // this.save_picture();
    });
  }
  
  inserted_id:any='';
  // save_picture()
  // {
  //   this.serve.addData('',"Distributor/saveVisitingCard").then(resp=>
  //     {
  //       console.log(resp);
  //       this.inserted_id = resp['inserted_id'];
  //       this.formdata.append("last_id",this.inserted_id);
  
  //       if(this.formdata)
  //       {
  //         let loader = this.loadingCtrl.create({
  //           content: "Uploading..."
  //         });
  //         loader.present();
  
  //         const fileTransfer: FileTransferObject = this.transfer.create();
  //         var random = Math.floor(Math.random() * 100);
  //         let options: FileUploadOptions = {
  //           fileKey: 'photo',
  //           fileName: "myImage_" + random + ".jpg",
  //           chunkedMode: false,
  //           mimeType: "image/jpeg",
  //         }
  
  //         fileTransfer.upload(this.image, this.constant.rootUrl+'woking_site_pics?id='+this.inserted_id, options)
  //         .then((data) => {
  //           console.log(data);
  //           loader.dismiss();
  //         });
  //       }
  //     })
  //   }
}
