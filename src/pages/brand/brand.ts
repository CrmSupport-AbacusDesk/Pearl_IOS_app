import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {ConstantProvider} from '../../providers/constant/constant';
import { CatalougePage } from '../catalouge/catalouge';
import { ProductDetailsPage } from '../product-details/product-details';
import { ProductsPage } from '../products/products';
import { SearchserviceProvider } from '../../providers/searchservice/searchservice';
import { SearchPage } from '../search/search';
/**
 * Generated class for the BrandPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-brand',
  templateUrl: 'brand.html',
})
export class BrandPage {
  brandlist:any = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public service: SearchserviceProvider, 
    public loadingCtrl: LoadingController, 
    public constant: ConstantProvider) {
       this.getBrand();

    }

    getBrand() {
      let loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
      });
      
      this.service.getBrand().then((response:any)=>{
        loading.dismiss();
        console.log(response);
        this.brandlist = response;
  
      console.log(this.brandlist);
        
      });
      loading.present();
    }

    goToSearch(){
      this.navCtrl.push(SearchPage)
    }

    goToProductDetailPage(brand) {
      let data={"brand":brand}
      this.navCtrl.push(ProductsPage,{brand:data});
    }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad BrandPage');
  }

}
