import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { CatalougeProvider } from '../../providers/catalouge/catalouge';
import { SearchPage } from '../search/search';
import { ProductsPage } from '../products/products';

/**
 * Generated class for the SubcategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subcategory',
  templateUrl: 'subcategory.html',
})
export class SubcategoryPage {

 
  subcategory:any=[];
  temp:any=[];

  cat:any;
  search:any=[];

  
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: CatalougeProvider ,public loadingCtrl: LoadingController) {
    
      this.cat = navParams.get('cat');
      this.subcategory=navParams.get('subcategory');
      this.temp=this.subcategory;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubcategoryPage');
  }


  getProductList(sub_category){

    console.log(this.cat);
    console.log(sub_category);
    console.log("hiii");
    

    this.navCtrl.push(ProductsPage,{sub_categories:sub_category, catgry:this.cat});
  }

  goToSearch(){
    this.navCtrl.push(SearchPage)

  }
  tmp_arr:any=[];

  getItems()
  {
       this.subcategory=[];        
     
         for(var i=0;i<this.temp.length; i++)
         {
           this.search.type=this.search.type.toLowerCase();
           this.tmp_arr.push(this.temp[i]['sub_category'].toLowerCase());
           
           if(this.tmp_arr[i].includes(this.search.type))
           {
            //  console.log(this.tmp_arr[i]);
             this.subcategory.push(this.temp[i]);
           }     
         }    
         console.log(this.subcategory);
         
   }

}