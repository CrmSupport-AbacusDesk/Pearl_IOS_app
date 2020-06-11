import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { ConstantProvider } from '../constant/constant';

/*
  Generated class for the FilterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FilterProvider {

  constructor(public http: Http, private constant:ConstantProvider) {
    console.log('Hello FilterProvider Provider');
  }


  // get_data(val,fn_name)
  // {
  //   console.log(val);
  
    
  //   let header = new Headers();
  //   header.append('Content-Type', 'application/json');
    
  //   return this.http.post(this.constant.server_url+fn_name, JSON.stringify(val), { headers : header });
    
  // }

}
