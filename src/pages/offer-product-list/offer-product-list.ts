import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { ConstantProvider } from '../../providers/constant/constant';
import { ProductDetailsPage } from '../product-details/product-details';


@IonicPage()
@Component({
  selector: 'page-offer-product-list',
  templateUrl: 'offer-product-list.html',
})
export class OfferProductListPage {

  sub_category_name:any;
  search:any={};
  product_data:any=[];
  upload_icon_url:any;
  upload_url:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public service:MyserviceProvider, public constant:ConstantProvider)
  {
    this.sub_category_name = this.navParams.get('sub_category');
    this.getOfferProduct();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferProductListPage');
    this.upload_icon_url = this.constant.upload_icon_url;
    this.upload_url = this.constant.upload_url;
  }

  getOfferProduct()
  {
    this.service.addData({'sub_category':this.sub_category_name, 'search':this.search},"Plumber/offer_product").then((resp)=>
    {
      console.log(resp);
      this.product_data = resp;
    });
  }

  goToProductDetailPage(product_id)
  {
    this.navCtrl.push(ProductDetailsPage,{'p_id':product_id,'product_type':'offer_product'});
  }

}
