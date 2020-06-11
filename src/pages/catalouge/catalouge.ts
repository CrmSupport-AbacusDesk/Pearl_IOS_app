import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, HideWhen, Item } from 'ionic-angular';
import { SubcategoryPage } from '../subcategory/subcategory';
import { ProductsPage } from '../products/products';
import { SearchPage } from '../search/search';
import { CatalougeProvider } from '../../providers/catalouge/catalouge';

/**
* Generated class for the CatalougePage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-catalouge',
  templateUrl: 'catalouge.html',
})
export class CatalougePage {
  category:any = [];
  temp:any=[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: CatalougeProvider ,public loadingCtrl: LoadingController) {
    this.getCategory();
  }

  load_data:any = "0";
  
  getCategory() {

    console.log('test');    
    
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });  
    
    this.service.getCategory().then((response:any)=>{
      loading.dismiss();
      this.category = response;
      this.temp=response;
      this.load_data = "1";
      
  });

    loading.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CatalougePage');   
  }
  search:any=[];
  sub_categories:any='';
  tmp_arr:any=[];
   getItems()
   {
        this.category=[];        
      
          for(var i=0;i<this.temp.length; i++)
          {
            this.search.type=this.search.type.toLowerCase();
            this.tmp_arr.push(this.temp[i]['category'].toLowerCase());
            
            if(this.tmp_arr[i].includes(this.search.type))
            {
              console.log(this.tmp_arr[i]);
              this.category.push(this.temp[i]);
            }     
          }    
    }
 
  goToSubCategoryPage(category) {

          let loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
          });  

          this.service.getsubCategory(category).then((result:any)=>{
            console.log(result);
            
          loading.dismiss();
          if(result.length==1)
          {
            this.sub_categories=result[0];
            console.log(this.sub_categories);
            
            console.log('test');
            this.navCtrl.push(ProductsPage, {catgry:category,sub_categories:this.sub_categories});
           }
          else
          {
            console.log(result);
            // let data={"sub_category":result[0]            }

            this.navCtrl.push(SubcategoryPage, {cat:category,subcategory:result});
          }
          
        });

  }
  
  goToSearch(){
    this.navCtrl.push(SearchPage)
  }
    
}

