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
export class FollowupserviceProvider {

  constructor(public http: Http, public constant: ConstantProvider, public storage: Storage ) {
    console.log('Hello FollowupserviceProvider Provider');
  }

  public getFollowup(date){
    console.log(date);
    return new Promise((resolve, reject) => {
      
      this.storage.get('token').then((token) => {

        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer '+token);

        this.http.post(this.constant.server_url+'Followup/followup_list',JSON.stringify(date),{headers: header }).map(res=>res.json())
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
