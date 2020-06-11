import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { OfferProductListPage } from '../offer-product-list/offer-product-list';


@IonicPage()
@Component({
  selector: 'page-offer-sub-category',
  templateUrl: 'offer-sub-category.html',
})
export class OfferSubCategoryPage {
  sub_category:any;
  subCategory_data:any=[];
  search:any={};
  product_data:any=[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public service:MyserviceProvider)
  {
    this.sub_category = this.navParams.get('category');
    this.getOfferSubCategory();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferSubCategoryPage');
  }
  
  getOfferSubCategory()
  {
    this.service.addData({'sub_category':this.sub_category, 'search':this.search},"Plumber/offer_sub_category").then((resp)=>
    {
      console.log(resp);
      this.subCategory_data = resp;
    });
  }
  
  getProductList(sub_category, product_length)
  {
    // if(product_length > 1)
    // {
      this.navCtrl.push(OfferProductListPage,{'sub_category':sub_category});
    // }
  }
  
}
