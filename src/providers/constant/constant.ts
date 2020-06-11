import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConstantProvider {
  
  constructor(public http: Http) {
    console.log('Hello ConstantProvider Provider');
  }
  public backButton = 0;
  
  public server_url: string = 'https://crm.pproducts.in/api/index.php/app/';
  public upload_url: string = 'https://crm.pproducts.in/uploads/Products/';
  public upload_icon_url: string = 'https://crm.pproducts.in/uploads/Products-Icon/';
  public updateVisitingCard: string = 'https://crm.pproducts.in/api/index.php/app/Distributor/';
  public VisitingCardURL: string = 'https://crm.pproducts.in/uploads/VisitingCard/';
}