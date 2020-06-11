import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyserviceProvider } from '../../../providers/myservice/myservice';
import { OrderListPage } from '../../order-list/order-list';
import { CpOrderListPage } from '../cp-order-list/cp-order-list';

@IonicPage()
@Component({
  selector: 'page-cp-order-cart',
  templateUrl: 'cp-order-cart.html',
})
export class CpOrderCartPage {
  
  cpOrderItem:any = [];
  data:any = {};
  brandWise:any = [];
  orderSubtotal:any = 0;
  orderDiscount:any = 0;
  orderGst:any = 0;
  orderAmount:any = 0;
  loading:any;
  drData:any;
  orderId:any='';
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public service: MyserviceProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController) 
  {
    if(this.navParams.get('drData'))
    {
      this.drData = this.navParams.get('drData');
    }
    
    if(this.navParams.get('OrderId'))
    {
      this.orderId = this.navParams.get('OrderId');
    }
  }
  
  ionViewWillEnter()
  {
    this.storage.get('cpOrderItem').then(resp => 
      {
        console.log(resp);
        this.cpOrderItem = resp; 
        
        this.calculateBrandWise();
      });
    }
    
    ionViewDidLoad() 
    {
      console.log('ionViewDidLoad CpOrderCartPage');
    }
    
    removeItemFromCart(index)
    {
      this.cpOrderItem.splice(index,1);
      this.brandWise = [];
      this.orderSubtotal = 0;
      this.orderDiscount = 0;
      this.orderGst = 0;
      this.orderAmount = 0;
      this.calculateBrandWise();
      this.storage.set('cpOrderItem',this.cpOrderItem);
      
      let toast = this.toastCtrl.create({
        message: 'Order Item Removed Successfully!',
        duration: 3000
      });
      toast.present();
    }
    
    deleteOrder()
    {
      this.storage.set('cpOrderItem','');
      this.data = {};
      this.brandWise = [];
      
      let toast = this.toastCtrl.create({
        message: 'Order Removed Successfully!',
        duration: 3000
      });
      toast.present();
      
      this.navCtrl.pop();
    }
    
    calculateBrandWise()
    {
      console.log(this.cpOrderItem);
      
      if(this.cpOrderItem.length != '0')
      {
        for(var i=0; i<this.cpOrderItem.length; i++)
        {
          if(this.brandWise.length==0)
          {
            this.brandWise.push({'qty':this.cpOrderItem[i]['qty'], 'amount':this.cpOrderItem[i]['amount'], 'brand':this.cpOrderItem[i]['brand']});
          }
          else
          {
            const exist = this.brandWise.findIndex(row=>row.brand==this.cpOrderItem[i].brand);
            
            if(exist == -1)
            {
              this.brandWise.push({'qty':this.cpOrderItem[i]['qty'], 'amount':this.cpOrderItem[i]['amount'], 'brand':this.cpOrderItem[i]['brand']});
            }
            else
            {
              this.brandWise[exist]['qty'] = parseInt(this.brandWise[exist]['qty']) + parseInt(this.cpOrderItem[i]['qty']);
              this.brandWise[exist]['amount'] = parseFloat(this.brandWise[exist]['amount']) + parseFloat(this.cpOrderItem[i]['amount']);
              this.brandWise[exist]['amount'] = parseFloat(this.brandWise[exist]['amount']).toFixed(2);
            }
          }
          
          this.orderSubtotal = parseFloat(this.orderSubtotal) + parseFloat(this.cpOrderItem[i]['sub_total']);
          this.orderDiscount = parseFloat(this.orderDiscount) + parseFloat(this.cpOrderItem[i]['discount_amount']);
          this.orderGst = parseFloat(this.orderGst) + parseFloat(this.cpOrderItem[i]['gst_amount']);
          this.orderAmount = parseFloat(this.orderAmount) + parseFloat(this.cpOrderItem[i]['amount']);
          
          this.orderSubtotal = parseFloat(this.orderSubtotal).toFixed(2);
          this.orderDiscount = parseFloat(this.orderDiscount).toFixed(2);
          this.orderGst = parseFloat(this.orderGst).toFixed(2);
          this.orderAmount = parseFloat(this.orderAmount).toFixed(2);
        }
      }
    }
    
    placeOrder()
    {
      this.lodingPersent();
      
      this.data.orderSubtotal = this.orderSubtotal;
      this.data.orderDiscount = this.orderDiscount;
      this.data.orderGst = this.orderGst;
      this.data.orderAmount = this.orderAmount;

      if(this.orderId != '')
      {
        this.service.addData({'orderData':this.data, 'orderItem':this.cpOrderItem, 'OrderId':this.orderId},"channelPartner/addOrderItem").then(resp=>
          {
            console.log(resp);
            this.loading.dismiss();
            
            let toast = this.toastCtrl.create({
              message: 'Order Added Successfully!',
              duration: 3000
            });
            toast.present();
            
            this.storage.set('cpOrderItem','');
            this.data = {};
            this.brandWise = [];
            
            this.navCtrl.pop().then(() => this.navCtrl.pop());
          }).catch((error:any)=>
          {
            this.loading.dismiss();
          });
        }
        else
        {
          this.service.addData({'orderData':this.data, 'orderItem':this.cpOrderItem},"channelPartner/submitOrder").then(resp=>
            {
              console.log(resp);
              this.loading.dismiss();
              
              let toast = this.toastCtrl.create({
                message: 'Order Added Successfully!',
                duration: 3000
              });
              toast.present();
              
              this.storage.set('cpOrderItem','');
              this.data = {};
              this.brandWise = [];
              
              this.navCtrl.pop().then(() => this.navCtrl.pop());
            }).catch((error:any)=>
            {
              this.loading.dismiss();
            });
          }
        }
        
        lodingPersent()
        {
          this.loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
          });
          this.loading.present();
        }
        
      }
      