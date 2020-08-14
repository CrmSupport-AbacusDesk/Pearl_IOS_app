import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { ConstantProvider } from '../constant/constant';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { timeout, catchError } from 'rxjs/operators';

@Injectable()
export class MyserviceProvider {
  
  userlogin:any;
  errorCount: any = 0;
  
  constructor(public http: Http, private constant: ConstantProvider, public storage: Storage, public alertCtrl: AlertController) {
    console.log('Hello MyserviceProvider Provider');
  }
  
  public get_data() {
    
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        console.log(value);
        
        let header = new Headers();
        header.append('Authorization', 'Bearer '+value);
        
        header.append('Content-Type', 'application/json');
        this.http.get(this.constant.server_url+'Distributor/lead_list' ,{headers: header}).map(res=>res.json())
        .subscribe(res=>{
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
      });
    });
  }
  
  public pending_data() {
    
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        console.log(value);
        
        let header = new Headers();
        header.append('Authorization', 'Bearer '+value);
        
        header.append('Content-Type', 'application/json');
        this.http.get(this.constant.server_url+'Checkin/pending_checkin' ,{headers: header}).map(res=>res.json())
        .subscribe(res=>{
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
      });
    });
  }
  
  public addData(value,url) {
    console.log(value);
    console.log(url);
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((token)=>{
        console.log(token);
        
        let header = new Headers();
        header.append('Authorization', 'Bearer '+token);
        header.append('Content-Type', 'application/json');
        this.http.post(this.constant.server_url+url,JSON.stringify(value),{headers: header}).pipe(timeout(20000)).map((res)=>res.json())
        .subscribe(res=>{
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
      });
    })
    
  }
  
  
  
  
  public set(value)
  {
    this.userlogin=value;
    console.log(this.userlogin);
    
  }
  public get()
  {
    return this.userlogin;
  }
}
