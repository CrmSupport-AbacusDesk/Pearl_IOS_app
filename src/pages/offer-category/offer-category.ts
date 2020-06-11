import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { OfferSubCategoryPage } from '../offer-sub-category/offer-sub-category';

@IonicPage()
@Component({
  selector: 'page-offer-category',
  templateUrl: 'offer-category.html',
})
export class OfferCategoryPage {
  
  search:any={};
  category_data:any = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public service:MyserviceProvider) 
  {
    this.getOfferCategory();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferCategoryPage');
  }
  
  getOfferCategory()
  {
    this.service.addData({'search':this.search},"Plumber/offer_category").then((resp)=>
    {
      console.log(resp);
      this.category_data = resp;
    });
  }
  
  sub_category:any=[];
  
  goToSubCategoryPage(cat_name, sub_category_length)
  {
    // if(sub_category_length > 1)
    // {
      this.navCtrl.push(OfferSubCategoryPage,{'category':cat_name});
    // }
  }
  
}
