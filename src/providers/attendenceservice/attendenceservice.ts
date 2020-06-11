import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ConstantProvider } from '../constant/constant';
import { Storage } from '@ionic/storage';

/*
  Generated class for the FollowupserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AttendenceserviceProvider {

  constructor(public http: Http, public constant: ConstantProvider, public storage: Storage ) {
    console.log('Hello AttendenceService Provider');
  }

  public start_attend(data){
    console.log(data);
    return new Promise((resolve, reject) => {
      
      this.storage.get('token').then((token) => {

        console.log(token);

        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+token);

        this.http.post(this.constant.server_url+'Attendence/start_attend',JSON.stringify(data),{headers: header}).map((res)=>res.json()).subscribe(res=>{
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
          console.log(err);
        });
      });
    });
  }



  public stop_attend(data){
    console.log(data);
    return new Promise((resolve, reject) => {
      
      this.storage.get('token').then((token) => {

        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+token);

        this.http.post(this.constant.server_url+'Attendence/stop_attend',JSON.stringify(data),{headers: header }).map(res=>res.json())
        .subscribe(res=>{
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
      });
    });
  }


  public last_attendence_data(){
    return new Promise((resolve, reject) => {
      
      this.storage.get('token').then((token) => {

        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+token);

        this.http.get(this.constant.server_url+'Attendence/last_attendence_data',{headers: header }).map(res=>res.json())
        .subscribe(res=>{
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
      });
    });
  }


  public get_attendance(){
    return new Promise((resolve, reject) => {
      
      this.storage.get('token').then((token) => {

        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+token);

        this.http.get(this.constant.server_url+'Attendence/get_attendence',{headers: header }).map(res=>res.json())
        .subscribe(res=>{
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
      });
    });
  }

  public getWorkingType(){
    return new Promise((resolve, reject) => {
      
      this.storage.get('token').then((token) => {

        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+token);

        this.http.get(this.constant.server_url+'attendence/get_working_type',{headers: header }).map(res=>res.json())
        .subscribe(res=>{
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
      });
    });
  }

}
