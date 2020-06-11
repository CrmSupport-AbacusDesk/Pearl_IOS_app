import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { CatalougeProvider } from '../../providers/catalouge/catalouge';
import { SearchserviceProvider } from '../../providers/searchservice/searchservice';
import { ConstantProvider } from '../../providers/constant/constant';
import { SearchPage } from '../search/search';
import { ProductDetailsPage } from '../product-details/product-details';
import { LNodeFlags } from '@angular/core/src/render3/interfaces';
import { startTimeRange } from '@angular/core/src/profile/wtf_impl';
import { FilterProvider } from '../../providers/filter/filter';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  listView:any;
  productlist:any=[];
  brandlist:any=[];
  categoryList:any;
  public sub_categoryes:any=[];
  public category:any;
  public newarrival:any; 
  public brand:any;
  filterSelectedData=[];
  subcategoryList:any=[];
  type_val:any
  tmp_arr:any=[];
  result:any=[];
  startlimit:any;
  endlimit:any;
  upload_url:any;
  upload_icon_url:any;
  load_data:any = "0";
  login_user_state:any='';
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public serv: CatalougeProvider, public service: SearchserviceProvider, public loadingCtrl: LoadingController, public constant:ConstantProvider, public filter:MyserviceProvider, public storage: Storage) 
  {
    this.sub_categoryes = navParams.get('sub_categories');
    console.log(this.sub_categoryes);
    
    this.category = navParams.get('catgry');
    this.newarrival = navParams.get('newarrival');
    this.brand = navParams.get('brand');
    console.log(this.brand);
    
    this.getProductList(this.filterSelectedData);
    this.getAllCAtegoryList();
    console.log(this.category);
    this.get_brands();

    this.storage.get('token_info')
    .then(resp=>{
      console.log(resp);
      this.login_user_state = resp;
    })
  }
  /****************************************************************************************** */
  getProductList(filterSelectedData) 
  {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });
    
    this.serv.getProductList(this.category, this.sub_categoryes,filterSelectedData,this.newarrival,this.brand).then((response:any)=>{
      loading.dismiss();
      console.log(response);
      
      this.productlist = response;

      if(this.productlist.length == '0')
      {
        this.load_data = "1";
      }
      this.tmp_arr=response;
    });
    loading.present();
   
  }

  getAllCAtegoryList()
  {
    this.filter.addData(0,'category/category_list').then((resp)=>
    {
      console.log(resp);
      this.categoryList=resp;
      this.tmp_cat=this.categoryList;
    })
  }
  


  get_brands()
  {
    this.serv.get_brand().then((resp)=>
    {
      console.log(resp);
      this.brandlist=resp;
      console.log(this.brandlist);
      
    })
  }

  getCategoryList()
  {
    
    this.filter.addData({"brand":this.tmp_brandData},'category/category_list').then((resp)=>
    {
      console.log(resp);
      this.categoryList=resp;
    })
  }

  getSubCategory()
  {
    this.filter.addData({"category":this.tmp_CatData},"category/subcategory_list").then((result=>{
      console.log(result);
      this.subcategoryList=result;
      console.log(this.subcategoryList);
      
    }))
  }

  /****************************************************************************************** */
  mainCategory:any=[];
  
  /****************************************************************************************** */
  
  
  search:any=[];
  tmp:any=[];
  getItems()
  {
    this.productlist=[];
    for(var i=0;i<this.tmp_arr.length; i++)
    {
      this.search.type=this.search.type.toLowerCase();
      this.tmp=this.tmp_arr[i]['cat_no'].toLowerCase();
      if(this.tmp.includes(this.search.type))
      {

        this.productlist.push(this.tmp_arr[i]);
      }  
      
    }    
    
  }
  
  toggleListView(){
    this.listView = !this.listView;
  }
  
  goToProductDetailPage(id) {
    this.navCtrl.push(ProductDetailsPage,{p_id:id});
  }
  
  goToSearch(){
    this.navCtrl.push(SearchPage)
  }
  
  /************************************************************/
  pagingEnabled:any;
  
  // doInfinite(infiniteScroll) 
  // {
    
  //   if(this.tmp_brandData.length!=0)
  //   { 
  //       console.log("INFINITE CALLED");
  //       console.log(this.startlimit);
     
  //       this.serv.getBrandDataScroll(this.productlist.length,this.tmp_brandData,this.tmp_CatData,this.tmp_subCat,this.startlimit).then((response:any)=>{
  //       console.log(response);
  //       if(response['brandData'] != null)
  //       {
  //         this.productlist = this.productlist.concat(response['brandData']);
  //         this.startlimit=response['limit'];
  //         // this.startlimit=this.startlimit+50;
  //       }
  //       this.pagingEnabled = true;
  //       console.log(this.productlist);
  //       infiniteScroll.complete();
  //       // this.pagingEnabled = false;
  //     });
  //   }
  //   else
  //   {
  //     this.pagingEnabled = false;
  //     console.log('Operation has ended');
  //   }
  // }
  
 
      getFilteredProduct(brand,category,subcategory)
      {
          let loading = this.loadingCtrl.create({
                spinner: 'hide',
                content: `<img src="./assets/imgs/gif.svg" class="h15" />`,});
          console.log(brand);
          console.log(category);
          console.log(subcategory);
          let data={"brand":brand,"category":category,"sub_category":subcategory};
          console.log(data);
          
          this.filter.addData(data,"product/cat_state_product_list").then((result=>{
            console.log(result);
            this.productlist=result;
          }))

          loading.present();
          setTimeout(() => {
            loading.dismiss();
          }, 2000);
      }


        
        tmp_CatData:any=[];
        tmp_cat:any=[];
        tmp_data:any=[];
        sub_cat:any=[];
        tmp_subCat:any=[];
        tmp_brandData:any=[];
        tmp_brand:any;
        /************************************************************/
        
        public brandRelatedData(type,brand,category,sub_categories,action,index)
        {
        
          if(type!='clear')    
          {
            if(type=='brand')
            {
              if(action==true)
              {
                console.log(brand);
                this.tmp_brandData.push(brand);
                console.log(this.tmp_brandData);
                
                this.getCategoryList();
                this.tmp_data=this.productlist;
                this.getFilteredProduct(this.tmp_brandData,"","");
               
              }
              if(action==false)
              {     
                var tempindex =this.tmp_brandData.findIndex(x=>x==brand);   
                console.log(tempindex);
                this.tmp_brandData.splice(tempindex,1);
                console.log(this.tmp_brandData);
                if(this.tmp_brandData.length>0)
                {
                  this.getFilteredProduct(this.tmp_brandData,"","");
                  this.getCategoryList();
                }

                else if(this.tmp_brandData.length==0)
                {
                  console.log(this.tmp_cat);
                  
                  this.productlist=this.tmp_arr;
                  this.categoryList=this.tmp_cat;
                }
              }
            }
            
            if(type == 'category'  ) 
            {
              
              if(action == true) 
              {
                console.log(category);
                
                this.tmp_CatData.push(category);
                console.log(this.tmp_CatData);
                this.tmp_data=this.productlist;
                console.log(this.tmp_data);
                
                this.getSubCategory();
                this.getFilteredProduct("",this.tmp_CatData,"");
              }
              if(action == false)
              {
                var tempindex =this.tmp_CatData.findIndex(x=>x==category); 
                console.log(tempindex);
                
                this.tmp_CatData.splice(tempindex,1);
                console.log(this.tmp_CatData);
                this.tmp
                if(this.tmp_CatData.length>0)
                {
                  this.getFilteredProduct("",this.tmp_CatData,"");
                }
                else
                {
                  this.productlist=this.tmp_data;
                }
              }
            }
            
            if(type=='sub_category') 
            {
              
              if(action==true)
              {
                this.tmp_subCat.push(sub_categories);
                console.log(this.tmp_subCat);
                this.tmp_data=this.productlist;
                this.getFilteredProduct("","",this.tmp_subCat);
              }
              if(action==false)
              {
                var tempindex =this.tmp_subCat.findIndex(x=>x==sub_categories); 
                console.log(tempindex);
                this.tmp_subCat.splice(tempindex,1);
                console.log(this.tmp_subCat);
                if(this.tmp_subCat.length>0)
               {                 
                 this.getFilteredProduct("","",this.tmp_subCat);
                }
                else
                {
                  this.productlist=this.tmp_data;
                }
              }
            }
          }
          else
          {
            
            for(let i=0;i<this.brandlist.length;i++)
            {
              this.brandlist[i].checked=false;
            }
            this.productlist=this.tmp_arr;
            this.categoryList=this.tmp_cat;
            this.subcategoryList=[];
          }
        }
        /************************************************************/
        
        togglePopUp() {
          console.log("hello");
          
          this.brandRelatedData('clear','','','','','');
        }
        
        // getSubCategoryData( category){
          
        //   console.log(category);
          
        //   this.serv.getSubCategoryData(category).then((response:any)=>{
        //     console.log(response);
        //     this.subcategorydata = this.subcategorydata.concat(response.sub_category);
        //     console.log(this.subcategorydata);
        //   });
        // }
        
        ionViewDidLoad() {
          this.upload_url = this.constant.upload_url;
          this.upload_icon_url = this.constant.upload_icon_url;
          console.log('ionViewDidLoad ProductsPage');
        }
        
        value:any="deactive";
        BrandActivated()
        {
          if(this.value=='deactive')
          {
            this.value="active";
          }
          else{
            this.value="deactive";
          }
          
        }
        value2:any="deactive";
        CategoryActivated()
        {
          if(this.value2=="deactive")
          {
            this.value2="active";
          }
          else{
            this.value2="deactive";
          }
        }
        value3:any="deactive"
        subCategoryActivated()
        {
          if(this.value3=="deactive")
          {
            this.value3="active";
          }
          else{
            this.value3="deactive";
          }
        }
        
      }
      