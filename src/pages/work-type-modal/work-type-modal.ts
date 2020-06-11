import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, Events } from 'ionic-angular';
import { AttendenceserviceProvider } from '../../providers/attendenceservice/attendenceservice';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { GeolocationserviceProvider } from '../../providers/geolocationservice/geolocationservice';


@IonicPage()
@Component({
  selector: 'page-work-type-modal',
  templateUrl: 'work-type-modal.html',
})
export class WorkTypeModalPage {
  working_type:any=[]
  input_type:any = false;
  user_id:any
  data:any={};
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public serv: AttendenceserviceProvider,public viewcontrol:ViewController, public loadingCtrl: LoadingController, public locationAccuracy: LocationAccuracy, public geolocation: Geolocation, private storage: Storage,public track: GeolocationserviceProvider,public events: Events) 
  {
    
    this.storage.get('userId').then((id) => 
    {  
      console.log(id);
      
      if(typeof(id) !== 'undefined' && id)
      {
        this.user_id = id;  
      }
    });
    this.getWorkingType();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkTypeModalPage');
  }
  
  getWorkingType()
  {
    this.serv.getWorkingType().then((response:any)=>{
      console.log(response);
      this.working_type=response;
    }).catch((error:any)=>
    {
      
    });
  }
  
  close()
  {
    this.viewcontrol.dismiss();
  }
  
  start_attend() 
  {
    var loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });
    
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        
        console.log('Request successful');
        
        let options = {maximumAge: 10000, timeout: 15000, enableHighAccuracy: true};
        this.geolocation.getCurrentPosition(options).then((resp) => {
          
          var lat = resp.coords.latitude
          var lng = resp.coords.longitude
          
          this.serv.start_attend({ 'lat': lat, 'lng': lng, 'id':this.user_id, 'data':this.data}).then((result) => 
          {
            console.log(result);
            
            if(result['msg'] =='success')
            {
              this.events.publish('user:login');
              this.track.startTracking();
              this.viewcontrol.dismiss();
            }
            loading.dismiss();
          }).catch((error:any)=>
          {
            loading.dismiss();
          });
          
        }).catch((error) => {
          console.log('Error getting location', error);
          this.serv.start_attend({'id':this.user_id, 'data':this.data}).then((result)=>
          {
            console.log(result);
            
            if(result['msg'] =='success')
            {    
              this.events.publish('user:login'); 
              this.track.startTracking();
              this.viewcontrol.dismiss();
            }
            loading.dismiss();
          }).catch((error:any)=>
          {
            loading.dismiss();
          });
        });
      },
      error => {
        console.log('Error requesting location permissions', error);
        loading.dismiss();
      });
      
      loading.present();
    }
    
    submit()
    {
      console.log(this.data);
      this.start_attend();
    }
    
    
  }
  