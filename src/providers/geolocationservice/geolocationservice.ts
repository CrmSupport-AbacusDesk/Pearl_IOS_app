// import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Storage } from '@ionic/storage';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { MyserviceProvider } from '../myservice/myservice';
import { Http } from '@angular/http';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

@Injectable()
export class GeolocationserviceProvider 
{
  
  user_id:any=0;
  constructor(public Http: Http,public zone: NgZone,public geolocation:Geolocation,public db:MyserviceProvider,public storage:Storage, public locationAccuracy: LocationAccuracy,public backgroundGeolocation: BackgroundGeolocation) 
  {

    setInterval(function () {
      // this.startTracking();
    }, 3600000); 
    
  }
  
  ionViewDidLoad() {
    this.storage.get('token')
    .then(resp=>{
      console.log(resp);
      this.user_id=resp;
    })
  }
  
  lat:any=0;
  lng:any=0;
  watch:any;
  
  
  startTracking() 
  {
    this.storage.get('token')
    .then(resp=>{
      console.log(resp);
      this.user_id=resp;
    })
    
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 6,
      stationaryRadius: 20,
      distanceFilter: 20,
      debug: false, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    };
    
    this.backgroundGeolocation.configure(config)
    .then(() => 
    {
      this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => 
      {
        console.log(location);
        
        let options = {
          frequency: 3000, 
          enableHighAccuracy: true
        };

        this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => 
        {
          console.log(position);
          this.zone.run(() => 
          {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            console.log(this.lat);
            console.log(this.lng);
            console.log(this.user_id);
            
            this.db.addData({"lat":this.lat,"lng":this.lng},"Attendence/live_tracking").then((resp)=>
            {
              console.log(resp);
            })
          });
        });
        // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
        // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
        // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
        this.backgroundGeolocation.finish(); // FOR IOS ONLY
      });
      
    });
    
    // start recording location
    this.backgroundGeolocation.start();
  }

  
  stopTracking() 
  {
    console.log('stopTracking');
    this.backgroundGeolocation.stop();
  }
}
