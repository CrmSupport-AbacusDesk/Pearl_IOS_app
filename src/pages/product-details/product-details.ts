import { Component } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';
import { ProductdetailserviceProvider } from '../../providers/productdetailservice/productdetailservice';
import { EnquiryPage } from '../enquiry/enquiry';
import { SearchPage } from '../search/search';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  p_id:any;

  upload_url:any;
  
  val:boolean=true;
  image:any=[];
  images_data:any=[];
  brand_data:any={};
  extra_field_data:any={};
  color_data:any=[];

  product_detaildata:any=[];
  pro_image:any = [];
  login_user_state:any='';
  public show_index:any=0;
  product_type:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ProductdetailserviceProvider ,public loadingCtrl: LoadingController,public constant:ConstantProvider,
    private socialSharing: SocialSharing, public storage: Storage) {

    this.p_id = this.navParams.get('p_id');
    // this.brand = this.navParams.get('brand');
    console.log(this.p_id);
    this.getProductDetail(this.p_id);
    // this.getBrandDetailData(this.brand);

    this.product_type = this.navParams.get('product_type');

    this.storage.get('token_info')
    .then(resp=>{
      console.log(resp);
      this.login_user_state = resp;
    })
  }

  make_active(index_val :any){
    console.log(index_val);
    this.show_index=index_val;
  }

  getProductDetail(p_id)
  {
    console.log(p_id);
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });


     this.service.getProductDetail(p_id).then((response:any)=>
     {
            loading.dismiss();
            console.log(response);
          this.product_detaildata= response['data'];
          console.log(this.product_detaildata);
          this.image = response['image'][0];
          this.images_data = response['image'];
          this.pro_image = this.images_data;
          this.brand_data = response['brand'];
          this.extra_field_data = response['extra_field'];
          this.color_data = '';


          if(response['color']) {

              for (let index = 0; index < response['color'].length; index++) {
                    
                  if(index == 0) {
                      this.color_data = response['color'][index];
                  } else {
                    this.color_data += ' | '+response['color'][index];
                  }
              }
          }
  
          console.log(this.image);
          console.log(this.pro_image);
          
          if(this.product_detaildata.length>0)
          {
            this.val=false;
            loading.dismiss();
            
          }
          else
          {
            setTimeout(()=>{
              this.val=false;
              loading.dismiss();
              
            },500);
          }

    });  
    loading.present();  
  }




  ionViewDidLoad() {
    this.upload_url = this.constant.upload_url;

    console.log(this.upload_url);
    console.log('ionViewDidLoad ProductDetailsPage');
  }

  goToSearch(){
    this.navCtrl.push(SearchPage)
  }

  enquiry(id){
    console.log(id);
    
    this.navCtrl.push(EnquiryPage,{product_id:id})
  }

  whatsappShare(){
    
    console.log(this.product_detaildata);
    console.log(this.images_data);
    console.log(this.image);
    
    
    var msg = 'Product Name : '+this.product_detaildata.product_name+'\nPrice : ₹ '+this.product_detaildata.price+'\nCat No. :'+this.product_detaildata.cat_no+'\nBrand : '+this.product_detaildata.brand;
    
    
    if(!this.image)
    {
        img='';
        
    } else {
        var  img = this.upload_url+this.image.image;

        console.log(img);
        
    }

    console.log(msg);
    
    this.socialSharing.share(msg,'Pearl Precision Product', img,'').then((result)=>{
      console.log('success ' + JSON.stringify(result))
    })
    .catch((error) => {
      console.log('error ' + JSON.stringify(error));
    });
    
}
}
