import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { CatalougePage } from '../catalouge/catalouge';
import { AboutusPage } from '../aboutus/aboutus';
import { SearchPage } from '../search/search';
import { ProductsPage } from '../products/products';
import { Storage } from '@ionic/storage';
import { CatalougeProvider } from '../../providers/catalouge/catalouge';
import { Geolocation } from '@ionic-native/geolocation';
import { AttendenceserviceProvider } from '../../providers/attendenceservice/attendenceservice';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { OfferCategoryPage } from '../offer-category/offer-category';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { OrderListPage } from '../order-list/order-list';
import { LedgerPage } from '../channel-partner-app/ledger/ledger';
import { CpOrderListPage } from '../channel-partner-app/cp-order-list/cp-order-list';
import { CheckinListPage } from '../sales-app/checkin-list/checkin-list';
import { CpDiscountPage } from '../channel-partner-app/cp-discount/cp-discount';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  attend_id: any = '';
  type:any = '';
  scheme_detail:any=[];
  schemes_validation:any=[];
  drDetailData:any=[];
  primaryOrderCount:any=0;
  secondaryOrderCount:any=0;
  
  constructor(public navCtrl: NavController, public service: CatalougeProvider , public loadingCtrl: LoadingController, private storage:Storage, public geolocation: Geolocation,  public attendence_serv: AttendenceserviceProvider, public toastCtrl: ToastController,public serve: MyserviceProvider, private barcode:BarcodeScanner, public alertCtrl:AlertController) 
  {
    
  }
  
  ionViewWillEnter()
  {
    this.plumber_data();  
    this.scheme_state();
    this.scheme_validation();
    this.drDetail();
    this.orderCount();
  }
  
  ngOnInit()
  {
    this.storage.get('type').then((type) => 
    {
      console.log(type);
      this.type = type;
      this.getBanner();
    });
    
    this.storage.get('user_type').then((resp) => 
    {
      console.log(resp);
      this.type = resp;
      this.getBanner();
    });
  }
  
  
  banner:any = [];
  banner_status:boolean = false;
  
  getBanner()
  {
    console.log(this.type);
    if(this.type == '' || this.type == null)
    {
      this.serve.addData({},'Attendence/get_banner').then((result)=>{
        console.log(result);
        this.banner = result;
      });
    }
    
    if(this.type)
    {
      this.serve.addData({'type':this.type},'Attendence/get_banner1').then((result)=>{
        console.log(result);
        this.banner = result;
      });
    }
    
  }
  
  
  SeeOfferProduct(){
    this.navCtrl.push(OfferCategoryPage);
  }
  
  SeeCatalogeList(){
    this.navCtrl.push(CatalougePage)
  }
  
  getNewArrival(newarrival){
    this.navCtrl.push(ProductsPage, {newarrival:newarrival} )
  }
  
  AboutMe(){
    this.navCtrl.push(AboutusPage)
  }
  
  goToSearch(){
    this.navCtrl.push(SearchPage)
  }
  
  
  attendence_data : any = [];
  
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Work Time Started Successfully',
      duration: 3000,
      position: 'bottom'
    });
    
    // toast.onDidDismiss(() => {
    //   console.log('Dismissed toast');
    // });
    
    toast.present();
  }
  
  start_attend()
  {
    
    console.log('test');
    this.geolocation.getCurrentPosition().then((resp) => {
      var lat = resp.coords.latitude
      var lng = resp.coords.longitude
      
      this.attendence_serv.start_attend({'lat':lat, 'lng':lng}).then((result)=>{
        console.log(result);
        // this.attend_id = result['attend_id'];
        // this.attendence_data  =result['attendence_data'];
        console.log(this.attend_id);
        this.presentToast();
      })
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    
    
    
  }
  
  presentToast1() {
    let toast = this.toastCtrl.create({
      message: 'Work Time Stop Successfully',
      duration: 3000,
      position: 'bottom'
    });
    
    // toast.onDidDismiss(() => {
    //   console.log('Dismissed toast');
    // });
    
    toast.present();
  }
  
  
  
  stop_attend()
  {
    
    this.geolocation.getCurrentPosition().then((resp) => {
      var lat = resp.coords.latitude
      var lng = resp.coords.longitude
      
      this.attendence_serv.stop_attend({'lat':lat, 'lng':lng, 'attend_id': this.last_attendence_data.attend_id}).then((result)=>{
        console.log(result);
        this.presentToast1();
        
      })
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    
  }
  
  
  last_attendence_data:any = [];
  
  last_attendence()
  {
    this.attendence_serv.last_attendence_data().then((result)=>{
      console.log(result);
      this.last_attendence_data = result['attendence_data'];
      console.log(this.last_attendence_data);
    })
  }
  
  barcodeData:any;
  plumber_detail:any=[];
  
  ionViewDidLoad() {
    this.plumber_data();
  }
  
  plumber_data()
  {
    this.serve.addData('','Plumber/plumber_deatil').then((result)=>
    {
      console.log(result);
      this.plumber_detail = result;
    });
  }
  
  scheme_state()
  {
    this.serve.addData('','Plumber/scheme_state').then((result)=>
    {
      console.log(result);
      this.scheme_detail = result;
    });
  }
  
  scheme_validation()
  {
    this.serve.addData('','Plumber/get_scheme_validation').then((result)=>
    {
      console.log(result);
      this.schemes_validation = result;
    });
  }
  
  scan_qr_code()
  {
    if(this.plumber_detail.qr_code_scan_limit < this.schemes_validation.scan_per_day)
    {
      this.lodingPersent();
      
      this.barcode.scan().then(resp => 
        {
          console.log('Barcode data', resp);
          this.barcodeData=resp;
          console.log(this.barcodeData);
          
          this.serve.addData(this.barcodeData,'Plumber/scan_qr_code').then((result)=>{
            console.log(result);
            this.loading.dismiss();
            
            let alert = this.alertCtrl.create({
              title: 'PEARL HAI HUM... ISME HAI DUM!',
              subTitle: result['status'],
              message : result['statusMessage'],
              buttons: ['Ok']
            });
            alert.present();
            
            this.plumber_data();  
            this.scheme_state();
            this.scheme_validation();
            
          });
        }).catch(err => 
          {
            console.log('Error', err);
            this.loading.dismiss();
          });
        }
        else
        {
          let alert = this.alertCtrl.create({
            
            title: 'PEARL HAI HUM... ISME HAI DUM!',
            subTitle: 'Error',
            message:'Your QR code scan limit exceeded',
            buttons: ['Ok']
          });
          alert.present();
        }
      }
      
      loading:any;
      lodingPersent()
      {
        this.loading = this.loadingCtrl.create({
          spinner: 'hide',
          content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
        });
        this.loading.present();
      }
      
      goToPrimaryOrder()
      {
        this.navCtrl.push(CpOrderListPage,{'orderType':'Primary'});
      }
      
      goToSecondaryOrder()
      {
        this.navCtrl.push(CpOrderListPage,{'orderType':'Secondary'});
      }
      
      goToLedger()
      {
        this.navCtrl.push(LedgerPage);
      }
      
      drDetail()
      {
        this.serve.addData('','channelPartner/drDetail').then((result)=>
        {
          console.log(result);
          
          if(result != 'Error')this.drDetailData = result;
        });
      }
      
      orderCount()
      {
        this.serve.addData('','channelPartner/orderCount').then((result)=>
        {
          console.log(result);
          this.primaryOrderCount = result['primary'];
          this.secondaryOrderCount = result['secondary'];
        });
      }
      
      goToCheckIn()
      {
        this.navCtrl.push(CheckinListPage,{'checkInType':'cp-checkIn'});
      }
      
      goToDiscount()
      {
        this.navCtrl.push(CpDiscountPage);
      }
      
    }
    