import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { Storage } from '@ionic/storage';
import { OrderListPage } from '../order-list/order-list';
import { OrderDetailPage } from '../order-detail/order-detail';
import { OrderTypeModalPage } from '../order-type-modal/order-type-modal';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-cart-detail',
  templateUrl: 'cart-detail.html',
})
export class CartDetailPage {
  
  data:any = {};
  order_data:any = {};
  order_item:any = [];
  globalVar:any;
  order:any = {};
  cart_form:any={};
  temp_array:any = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: MyserviceProvider, public storage: Storage, public alertCtrl: AlertController, public loadingCtrl: LoadingController,public toastCtrl: ToastController,public locationAccuracy: LocationAccuracy, public geolocation: Geolocation ) 
  {  
    
  }
  
  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad CartDetailPage');
  }
  
  
  ionViewDidEnter()
  { 
    this.storage.get('order_item_array').then((order_item) => {
      console.log(order_item);
      
      if(typeof(order_item) !== 'undefined' && order_item)
      {
        this.order_item = order_item;
        this.temp_array = JSON.parse(JSON.stringify(order_item));
        this.test();  
      }
    });
    
    this.storage.get('order_item_length').then((order_item_length) => {
      console.log(order_item_length);
      
      if(typeof(order_item_length) !== 'undefined' && order_item_length)
      {
        this.globalVar = order_item_length;  
      }
    });
    
    
    this.storage.get('order_details').then((order_details) => {
      console.log(order_details);
      if(typeof(order_details) !== 'undefined' && order_details)
      {
        this.order_data = order_details;
        console.log(this.order_data);
        console.log(this.order_data.order_id);
      }
    });
  }
  
  amount:any=0;
  gst_amount:any=0;
  subtotal:any=0;
  second_subtotal:any=0;
  
  cal_cash_discount()
  {
    this.order_data.cd_amount = 0;
    this.order_data.cd_percentage = 0;
    
    this.subtotal = this.order_data.sub_total - this.order_data.order_discount;
    this.order_data.cd_amount = (this.subtotal * this.cart_form.cd)/100;
    this.order_data.cd_amount = parseFloat(this.order_data.cd_amount);
    this.order_data.cd_percentage = this.cart_form.cd;
    
    this.second_subtotal = this.subtotal - this.order_data.cd_amount;
    
    this.gst_amount = (this.second_subtotal * this.order_data.order_gst_percent)/100;
    
    this.amount = this.second_subtotal + this.gst_amount;
    
    this.order_data.order_total = parseFloat(this.amount);
    this.order_data.order_gst = parseFloat(this.gst_amount);
    
    console.log(this.order_data);
  }
  
  brand_qty:any = 0;
  brand_amount:any = 0;
  temp_arr:any = [];
  
  test()
  {
    this.temp_arr=[]
    const orderArray=JSON.parse(JSON.stringify(this.order_item))
    
    console.log(this.order_item);
    for(var i=0;i<orderArray.length;i++)
    {
      console.log("test");
      
      if(this.temp_arr.length==0)
      {
        this.temp_arr.push(orderArray[i]);
      }
      else
      {
        console.log(this.temp_arr);
        
        const exist=this.temp_arr.findIndex(row=>row.brand==orderArray[i].brand)
        if(exist == -1)
        {
          console.log("if block");
          
          this.temp_arr.push(orderArray[i]);
        }
        else
        {
          console.log(this.temp_arr[exist].qty);
          
          this.temp_arr[exist].qty=parseInt(this.temp_arr[exist].qty)+parseInt(orderArray[i].qty);
          this.temp_arr[exist].amount=parseFloat(this.temp_arr[exist].amount)+parseFloat(orderArray[i].amount);
        }
      } 
    }
  }
  
  
  removeFromCart(index)
  {
    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Are you sure you want to delete?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            
            this.delete_order_item(index);
          }
        }
      ]
    })
    
    alert.present();
  }
  
  search:any=[];
  tmp:any=[];
  
  getItems()
  {
    this.order_item = [];
    
    for(var i=0;i<this.temp_array.length; i++)
    {
      this.search.type=this.search.type.toLowerCase();
      console.log(this.search.type);
      this.tmp=this.temp_array[i]['cat_no'].toLowerCase();
      console.log(this.tmp);
      if(this.tmp.includes(this.search.type))
      {
        this.order_item.push(this.temp_array[i]);
      }      
    }    
  }
  
  addOrderItem()
  {
    this.lodingPersent();
    console.log('order saved');
    
    this.service.addData({'item':this.order_item,'order_id':this.order_data.order_id,'order_data':this.order_data},"Order/add_order_item").then((result)=>{
      console.log(result);
      
      if(result == 'success')
      {
        let toast = this.toastCtrl.create({
          message: 'Order Item Added Successfully!',
          duration: 3000
        });
        
        toast.present();
        
        this.navCtrl.push(OrderDetailPage,{'order_id':this.order_data.order_id});
        
        this.loading.dismiss();
      }
      
      this.storage.set('order_item_array','');
      this.storage.set('order_item_length','');
      this.storage.set('order_details','');
      
      this.order_data = {};
      this.order_item=[];
      this.globalVar = '';
    }).catch((error:any)=>
    {
      this.loading.dismiss();
    });
  }
  
  
  presentToast1() 
  {
    let toast = this.toastCtrl.create({
      message: 'Order Item Deleted Successfully',
      duration: 3000,
      position: 'bottom'
    });  
    toast.present();
  }
  
  
  delete_order_item(index)
  {
    console.log(index);
    console.log(this.order_item);
    console.log(this.order_data);
    console.log(this.globalVar);
    
    this.globalVar = this.globalVar - 1;
    
    this.storage.set('order_item_length',this.globalVar);
    
    this.order_data.order_total = parseFloat(this.order_data.order_total) - parseFloat(this.order_item[index].amount);
    
    this.order_data.order_gst = parseFloat(this.order_data.order_gst) - parseFloat(this.order_item[index].gst);
    
    this.order_data.order_discount = parseFloat(this.order_data.order_discount) - parseFloat(this.order_item[index].discount);
    
    this.order_data.order_item = parseFloat(this.order_data.order_item) - parseFloat(this.order_item[index].qty);
    
    this.order_data.sub_total = parseFloat(this.order_data.sub_total) - parseFloat(this.order_item[index].sub_total);
    
    this.storage.set('order_details',this.order_data);
    
    this.order_item.splice(index,1);
    
    this.storage.set('order_item_array',this.order_item);
    
    console.log(this.order_item);
    
    this.presentToast1();
    
    if(this.order_item.length)
    {
      this.test();
    }
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
  
  place_order()
  {
    this.lodingPersent();
    
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        
        let options = {maximumAge: 10000, timeout: 15000, enableHighAccuracy: true};
        this.geolocation.getCurrentPosition(options).then((resp) => {
          
          var lat = resp.coords.latitude
          var lng = resp.coords.longitude
          
          this.order_data.lat = lat;
          this.order_data.lng = lng;
          
          this.order_data.order_detail=this.order_item;
          this.order_data.order_remark = this.order.remark;
          
          this.service.addData(this.order_data,"Order/add_order").then((result)=>
          {
            console.log(result);
            
            this.loading.dismiss();
            
            let toast = this.toastCtrl.create({
              message: 'Order Saved Successfully!',
              duration: 3000
            });
            
            if(result['order_id'])
            toast.present();
            
            this.navCtrl.setRoot(OrderListPage);
            
            this.storage.set('order_item_array','');
            this.storage.set('order_item_length','');
            this.storage.set('order_details','');
            
            this.order_data = {};
            this.order_item=[];
            this.globalVar = '';
            
          }).catch((error:any)=>
          {
            this.loading.dismiss();
          });
          
        },
        error => {
          console.log('Error requesting location permissions', error);
          this.loading.dismiss();          
        });
      });
    }
    order_for:any = '';
    
    presentAlert1() 
    {
      let alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: 'Select Distributor',
        buttons: ['Ok']
      });
      alert.present();
    }
    
    place_order_dealer()
    {
      this.lodingPersent();
      
      this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
        () => {
          
          let options = {maximumAge: 10000, timeout: 15000, enableHighAccuracy: true};
          this.geolocation.getCurrentPosition(options).then((resp) => {
            
            var lat = resp.coords.latitude
            var lng = resp.coords.longitude
            
            this.order_data.lat = lat;
            this.order_data.lng = lng;
            
            this.order_data.data = this.data;
            this.order_data.order_detail=this.order_item;
            this.order_data.order_remark = this.order.remark;
            
            this.service.addData(this.order_data,"Order/add_dealer_order").then((result)=>
            {
              console.log(result);
              
              if(result)
              {
                this.order_for = result['order_type'];
                this.loading.dismiss();
                
                let toast = this.toastCtrl.create({
                  message: 'Order Saved Successfully!',
                  duration: 3000
                });
                
                if(result['order_id'])
                toast.present();
                
                this.navCtrl.setRoot(OrderListPage,{'order_type':this.order_for});
                
                this.storage.set('order_item_array','');
                this.storage.set('order_item_length','');
                this.storage.set('order_details','');
                
                this.order_data = {};
                this.order_item=[];
                this.globalVar = '';
              }
              
            }).catch((error:any)=>
            {
              this.loading.dismiss();
            });
          },
          error => {
            console.log('Error requesting location permissions', error);
            this.loading.dismiss();          
          });
        });
      }
      
      
      delete_order()
      {
        this.storage.set('order_item_array','');
        this.storage.set('order_item_length','');
        this.storage.set('order_details','');
        
        this.order_data = {};
        this.order_item=[];
        this.globalVar = '';
        
        this.navCtrl.push(OrderTypeModalPage); 
      }
      
    }
    