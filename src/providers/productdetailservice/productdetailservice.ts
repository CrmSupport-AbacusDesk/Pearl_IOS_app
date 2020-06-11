import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ConstantProvider } from '../constant/constant';

/*
  Generated class for the ProductdetailserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductdetailserviceProvider {

  constructor(public http: Http, private constant: ConstantProvider, public storage: Storage){
    console.log('Hello ProductdetailserviceProvider Provider');
  }


  public getProductDetail(p_id){
    console.log(p_id);
    return new Promise((resolve, reject) => {

      this.storage.get('token').then((token) => {

          console.log(token);
          if(typeof(token) !== 'undefined' && token) {

              let header = new Headers();
              header.append('Content-Type', 'application/json');
              header.append('Authorization', 'Bearer '+token);
              
              this.http.post(this.constant.server_url+'product/product_data',JSON.stringify(p_id),{headers: header}).map(res=>res.json())
              .subscribe(res=>{
                console.log(res);
                resolve(res);
              }, (err) => {
                reject(err);
              });
          } 
      });

    });
  }

}
