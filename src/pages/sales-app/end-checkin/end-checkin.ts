import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { MyserviceProvider } from '../../../providers/myservice/myservice';
import { CheckinListPage } from '../checkin-list/checkin-list';
import { Geolocation } from '@ionic-native/geolocation';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { AddOrderPage } from '../../add-order/add-order';
import { Storage } from '@ionic/storage';


/**
* Generated class for the EndCheckinPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-end-checkin',
  templateUrl: 'end-checkin.html',
})
export class EndCheckinPage {
  
  checkin_data:any = [];
  checkin:any = {};
  checkinForm: FormGroup;
  order_token :any = [];
  brand_assign:any = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: MyserviceProvider,public geolocation: Geolocation, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public formBuilder: FormBuilder, public locationAccuracy: LocationAccuracy , public alertCtrl: AlertController,public storage: Storage) {
    this.checkin_data = this.navParams.get('data');
    console.log(this.checkin_data);
    
    
    this.storage.get('order_details').then((order_details) => {
      console.log(order_details);
      this.order_token = order_details;
      console.log(this.order_token);
      if(typeof(order_details) !== 'undefined' && order_details){
        this.order_token = order_details;
        console.log(this.order_token);
        
      }
    });
    
    this.checkinForm = this.formBuilder.group({
      // companyName: ['', Validators.compose([Validators.required])]
      description: ['',Validators.compose([Validators.required])]
    })
    
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad EndCheckinPage');
  }
  
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Visit Ended Successfully',
      duration: 3000,
      position: 'bottom'
    });
    
    // toast.onDidDismiss(() => {
    //   console.log('Dismissed toast');
    // });
    
    toast.present();
  }
  
  
  
  for_order:any = [];
  
  
  presentAlert1() {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: 'Order Already Presn=ent in cart for some party',
      buttons: [
        
        {
          text: 'Yes',
          handler: () => {
            
            this.navCtrl.push(AddOrderPage)
          }
        }
      ]
    });
    alert.present();
  }
  
  
  end_visit(checkin_id, description)
  {
    if(this.order_token)
    {
      
      
      if(this.checkinForm.invalid)
      {
        this.checkinForm.get('description').markAsTouched();
        
        
        
        return;
      }
      
      
      this.storage.set('order_item_array','');
      this.storage.set('order_item_length','');
      this.storage.set('order_details','');
      
      this.order_token = [];
      
      
      var loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
      });
      console.log(checkin_id);
      console.log(description);    
      
      
      this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
        () => {
          
          console.log('Request successful');
          
          // this.showLoading();
          
          let options = {maximumAge: 10000, timeout: 15000, enableHighAccuracy: true};
          this.geolocation.getCurrentPosition(options).then((resp) => {
            
            console.log(resp.coords.latitude);
            console.log(resp.coords.longitude);
            // this.saveOrderHandler(resp.coords);
            
            var lat = resp.coords.latitude
            var lng = resp.coords.longitude
            
            this.service.addData({'lat':lat, 'lng':lng, 'checkin_id': checkin_id, 'checkin': description},'Checkin/visit_end').then((result) => {
              console.log(result);
              this.for_order = result['for_order'];
              this.brand_assign = result['brand_assign'];
              
              if(result['msg'] == 'success')
              {
                
                loading.dismiss();
                
                
                
                this.presentToast();
                
                this.presentAlert();
              }
              
              
              
              
            })
            
          }).catch((error) => {
            console.log('Error getting location', error);
            // this.saveOrderHandler({});
            this.service.addData({'checkin_id': checkin_id, 'checkin': description},'Checkin/visit_end').then((result)=>{
              console.log(result);
              this.for_order = result['for_order'];
              this.brand_assign = result['brand_assign'];
              
              if(result['msg'] == 'success')
              {
                loading.dismiss();
                // this.navCtrl.push(CheckinListPage);
                this.presentToast();
                this.presentAlert();
              }
              
            })
          });
        },
        error => {
          console.log('Error requesting location permissions', error);
          loading.dismiss();          
        });
        
        loading.present();
        
      }
      
      if(this.order_token == '' || this.order_token == null)
      {
        if(this.checkinForm.invalid)
        {
          this.checkinForm.get('description').markAsTouched();
          
          
          
          return;
        }
        
        
        var loading = this.loadingCtrl.create({
          spinner: 'hide',
          content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
        });
        console.log(checkin_id);
        console.log(description);  
        
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => {
            
            console.log('Request successful');
            
            // this.showLoading();
            
            let options = {maximumAge: 10000, timeout: 15000, enableHighAccuracy: true};
            this.geolocation.getCurrentPosition(options).then((resp) => {
              
              console.log(resp.coords.latitude);
              console.log(resp.coords.longitude);
              // this.saveOrderHandler(resp.coords);
              
              var lat = resp.coords.latitude
              var lng = resp.coords.longitude
              
              this.service.addData({'lat':lat, 'lng':lng, 'checkin_id': checkin_id, 'checkin': description},'Checkin/visit_end').then((result) => {
                console.log(result);
                this.for_order = result['for_order'];
                this.brand_assign = result['brand_assign'];
                
                if(result['msg'] == 'success')
                {
                  
                  loading.dismiss();
                  
                  
                  
                  this.presentToast();
                  
                  this.presentAlert();
                }
                
                
                
                
              })
              
            }).catch((error) => {
              console.log('Error getting location', error);
              // this.saveOrderHandler({});
              this.service.addData({'checkin_id': checkin_id, 'checkin': description},'Checkin/visit_end').then((result)=>{
                console.log(result);
                this.for_order = result['for_order'];
                this.brand_assign = result['brand_assign'];
                
                if(result['msg'] == 'success')
                {
                  loading.dismiss();
                  // this.navCtrl.push(CheckinListPage);
                  this.presentToast();
                  this.presentAlert();
                }
                
              })
            });
          },
          error => {
            console.log('Error requesting location permissions', error);
            loading.dismiss();            
          });
          
          loading.present();
        }
        
        
      }
      
      
      presentAlert() {
        let alert = this.alertCtrl.create({
          title: 'Create Order',
          message: 'Do you want to create order for this checkin?',
          cssClass: 'alert-modal',
          buttons: [
            {
              text: 'Yes',
              handler: () => {
                console.log('Yes clicked');
                console.log(this.for_order);
                this.navCtrl.push(AddOrderPage,{'for_order':this.for_order,'brand_assign':this.brand_assign});
                
              }
            },
            {
              text: 'No',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
                console.log(this.for_order)
                this.navCtrl.push(CheckinListPage);
                
                
              }
            }
          ]
        });
        alert.present();
      }
      
    }
    