import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { MyserviceProvider } from '../../../providers/myservice/myservice';
import { Storage } from '@ionic/storage';
import { CpOrderCartPage } from '../cp-order-cart/cp-order-cart';

@IonicPage()
@Component({
  selector: 'page-add-cp-order',
  templateUrl: 'add-cp-order.html',
})
export class AddCpOrderPage {
  
  data:any = {};
  value:any = {};
  cat_no:any = [];
  brands:any = [];
  colors:any = [];
  productId:any;
  productDetail:any = [];
  cartItem:any = [];
  showProductDetailDiv : any = false;
  drData:any;
  orderId:any='';
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: MyserviceProvider, public storage: Storage, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) 
  {
    this.getCode();
    
    if(this.navParams.get('data'))
    {
      this.drData = this.navParams.get('data');
    }
    
    if(this.navParams.get('order_id'))
    {
      this.orderId = this.navParams.get('order_id');
    }
  }
  
  ionViewWillEnter()
  {
    this.storage.get('cpOrderItem').then(resp => 
      {
        console.log(resp);
        this.cartItem = resp; 
        
        if(this.cartItem.length != '0')
        {
          this.itemCart = this.cartItem;
        }
        else
        {
          this.itemCart = [];
        }
      });
    }
    
    ionViewDidLoad() 
    {
      console.log('ionViewDidLoad AddCpOrderPage');
    }
    
    getCode()
    {
      this.lodingPersent();
      
      this.service.addData({},"channelPartner/getProductCode").then(resp=>
        {
          console.log(resp);
          this.cat_no = resp;
          this.loading.dismiss();
        }).catch((error:any)=>
        {
          this.loading.dismiss();
        });
      }
      
      selectProductCode(event)
      {
        this.productId = event.value.id;
        this.getBrandColor(event.value.id);
      }
      
      brandFlag:any = false;
      colorFlag:any = false;
      
      getBrandColor(id)
      { 
        this.service.addData({'productId':id},"channelPartner/getBrandColor").then(resp=>
          {
            console.log(resp);
            this.brands = resp['brands'];
            this.colors = resp['colors'];
            
            if(this.brands.length != '0')this.brandFlag = true;
            if(this.colors.length != '0')this.colorFlag = true;
            if(this.brandFlag == false || this.colorFlag == false)this.getProductDetail();
          }).catch((error:any)=>
          {
          });
        }
        
        
        brandSelected(brand)
        {
          this.getProductDetail();
        }
        
        colorSelected(color)
        {
          this.getProductDetail();
        }
        
        getProductDetail()
        {
          this.service.addData({'productId':this.productId},"channelPartner/getProductDetail").then(resp=>
            {
              console.log(resp);
              this.productDetail = resp;
              
              this.productDetail.color = this.data.color;
              this.productDetail.brand = this.data.brand;
              
              if((this.colorFlag == true && this.productDetail.color) || (this.brandFlag == true && this.productDetail.brand))
              {
                this.showProductDetailDiv = true;
              }
            }).catch((error:any)=>
            {
            });
          }
          
          calculate()
          {
            this.productDetail.sub_total = this.productDetail.qty * this.productDetail.price;
            
            this.productDetail.temp_discount_amount =  ( ( parseFloat(this.productDetail.discount) / 100 ) * parseFloat(this.productDetail.sub_total) ) ;
            
            this.productDetail.discount_amount = parseFloat(this.productDetail.temp_discount_amount).toFixed(2);
            
            this.productDetail.sub_total_1 =  parseFloat(this.productDetail.sub_total) - parseFloat(this.productDetail.discount_amount) ;
            
            this.productDetail.temp_gst_amount = ( parseFloat(this.productDetail.gst) / 100 ) * parseFloat(this.productDetail.sub_total_1)  ;
            
            this.productDetail.gst_amount =  parseFloat(this.productDetail.temp_gst_amount).toFixed(2) ;
            
            this.productDetail.amount = parseFloat(this.productDetail.gst_amount ) + parseFloat( this.productDetail.sub_total_1);
            
            this.productDetail.amount = parseFloat(this.productDetail.amount).toFixed(2); 
          }
          
          itemCart:any = [];
          
          addToCart()
          {
            if(!this.productDetail.brand && this.brandFlag == true)
            {
              this.brandAlert();
              return;
            }
            if(!this.productDetail.color && this.colorFlag == true)
            {
              this.colorAlert1();
              return;
            }
            if(!this.productDetail.qty)
            {
              this.qtyAlert1();
              return;
            }
            
            
            if(this.itemCart.length != 0)
            {
              for(var i=0; i<this.itemCart.length; i++)
              { 
                if((this.itemCart[i].cat_no == this.productDetail.cat_no) && (this.itemCart[i].brand == this.productDetail.brand) && (this.itemCart[i].color == this.productDetail.color))
                {
                  this.itemCart[i].qty =  parseInt(this.itemCart[i].qty) + parseInt(this.productDetail.qty);
                  
                  this.itemCart[i].sub_total =  parseFloat(this.itemCart[i].sub_total) + parseFloat(this.productDetail.sub_total);
                  
                  this.itemCart[i].discount_amount =  parseFloat(this.itemCart[i].discount_amount) + parseFloat(this.productDetail.discount_amount);
                  
                  this.itemCart[i].sub_total_1 =  parseFloat(this.itemCart[i].sub_total_1) + parseFloat(this.productDetail.sub_total_1);
                  
                  this.itemCart[i].gst_amount =  parseFloat(this.itemCart[i].gst_amount) + parseFloat(this.productDetail.gst_amount);
                  
                  this.itemCart[i].amount =  parseFloat(this.itemCart[i].amount) + parseFloat(this.productDetail.amount);
                  
                  this.itemCart[i].sub_total = parseFloat(this.itemCart[i].sub_total).toFixed(2);
                  this.itemCart[i].discount_amount = parseFloat(this.itemCart[i].discount_amount).toFixed(2);
                  this.itemCart[i].sub_total_1 = parseFloat(this.itemCart[i].sub_total_1).toFixed(2);
                  this.itemCart[i].gst_amount = parseFloat(this.itemCart[i].gst_amount).toFixed(2);
                  this.itemCart[i].amount = parseFloat(this.itemCart[i].amount).toFixed(2);
                  
                  break;
                }
                else
                {
                  this.itemCart.push(this.productDetail);
                  break;
                }
              }
            }
            else
            {
              this.itemCart.push(this.productDetail);
            } 
            
            this.storage.set('cpOrderItem', this.itemCart);
            this.productId = "";
            this.data.brand = "";
            this.data.color = "";
            this.productDetail = {};
            this.data = {};
            this.showProductDetailDiv = false;
            this.brands = [];
            this.colors = [];
            this.brandFlag = false;
            this.colorFlag = false;
            
            let toast = this.toastCtrl.create({
              message: 'Order Item Added Successfully!',
              duration: 3000
            });
            toast.present();
          }
          
          goToCart()
          {
            this.navCtrl.push(CpOrderCartPage,{drData:this.drData, OrderId:this.orderId});
          } 
          
          brandAlert() 
          {
            let alert = this.alertCtrl.create({
              title: 'Alert',
              subTitle: 'Select Brand',
              buttons: ['Ok']
            });
            alert.present();
          }
          
          colorAlert1() 
          {
            let alert = this.alertCtrl.create({
              title: 'Alert',
              subTitle: 'Select Color',
              buttons: ['Ok']
            });
            alert.present();
          }
          
          qtyAlert1() 
          {
            let alert = this.alertCtrl.create({
              title: 'Alert',
              subTitle: 'Add Quantity',
              buttons: ['Ok']
            });
            alert.present();
          }
          
          loading:any;
          lodingPersent()
          {
            this.loading = this.loadingCtrl.create({
              spinner: 'hide',
              content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
            });
            this.loading.present();
          }
        }