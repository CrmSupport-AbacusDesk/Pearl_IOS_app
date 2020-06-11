import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, Navbar, Platform, Nav, App } from 'ionic-angular';
import { AddOrderPage } from '../add-order/add-order';
import { OrderDetailPage } from '../order-detail/order-detail';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { OrderTypeModalPage } from '../order-type-modal/order-type-modal';
import { ViewChild } from '@angular/core';
import { DashboardPage } from '../dashboard/dashboard';
import { Storage } from '@ionic/storage';
import { AddCpOrderPage } from '../channel-partner-app/add-cp-order/add-cp-order';


@IonicPage()
@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html',
})
export class OrderListPage {
  
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild(Nav) nav: Nav;
  
  loginDeatil:any=[];
  order_List:any=[];
  order_type1:any='';
  direct_count:any=[];
  primary_order_type='';
  secondary_order_type='';
  direct_order_type='';
  order_token:any = {};
  limit=0;
  flag:any='';
  orderType:any = '';
  
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams,public service:MyserviceProvider, public modalCtrl: ModalController, public storage: Storage, public platform: Platform, public appCtrl: App) 
  {
    this.getLoginDetail();  
    
    let backAction  = platform.registerBackButtonAction(()=>
    {
      this.navCtrl.setRoot(DashboardPage);
      backAction()
    },2);
    
    this.storage.get('order_details').then((order_details) => {
      console.log(order_details);
      this.order_token = order_details;
      console.log(this.order_token);
      if(typeof(order_details) !== 'undefined' && order_details){
        this.order_token = order_details;
        console.log(this.order_token);
        
      }
    });
    
    
    if(this.navParams.get('primary'))
    {
      this.orderType = this.navParams.get('primary');  
      this.getorderList(this.orderType);
    }
    
    if(this.navParams.get('secondary'))
    {
      this.orderType = this.navParams.get('secondary');  
      this.getorderList(this.secondary_order_type);
    }
    
    if(this.navParams.get('direct'))
    {
      this.orderType = this.navParams.get('direct');
      this.getorderList(this.orderType);
    }
    
    if(this.navParams.get('order_type'))
    {
      this.orderType = this.navParams.get('order_type');
      
      if(this.orderType == 'Pearl')
      {
        this.getorderList('Primary');
      }
      else
      {
        this.getorderList('Secondary');
      }
    }
    
    if(this.order_type1 == '' && this.primary_order_type == '' && this.secondary_order_type == ''  && this.direct_order_type == '')
    {
      this.getorderList('Primary');
    }
  }
  
  ionViewDidLoad() 
  {
    this.navBar.backButtonClick = (e:UIEvent)=>
    {
      this.navCtrl.pop();  
    }
    
    if(this.navCtrl.length)
    {
      for ( let i=0; i < this.navCtrl.length(); i++ )
      {
        let v = this.navCtrl.getViews()[i];    
      }
    }
  }
  
  getLoginDetail()
  {
    this.service.addData('','Attendence/getLoginData').then(resp=>
      {
        console.log(resp);
        this.loginDeatil = resp;
      })
    }
    
    empty_cart:boolean;
    
    add_primary_order()
    {  
      this.empty_cart = true;
      
      this.storage.get('order_type').then((data) => 
      {
        console.log(data);
        
        if(typeof(data) !== 'undefined' && data)
        {
          if(data == this.order_type)
          {
            this.storage.get('order_item_array').then((order_item) => 
            {
              if(typeof(order_item) !== 'undefined' && order_item)
              {
                this.empty_cart = false;              
              }
              else
              {
                this.empty_cart = true;
              }
              
              this.call_fn();
            });
          }
          else
          {
            this.empty_cart = true;
            this.storage.set('order_type',this.order_type);
            this.storage.set('order_item_array','');
            this.storage.set('order_item_length','');
            this.storage.set('order_details','');
            this.call_fn();
          }
        }
        else
        {
          this.storage.set('order_type',this.order_type);
          this.empty_cart = false;
          this.call_fn();
        }
      });
    }
    
    
    call_fn()
    {
      if(this.empty_cart)
      {
        let myModal= this.modalCtrl.create(OrderTypeModalPage); 
        myModal.present();
      }
      else
      {
        this.navCtrl.push(AddOrderPage);
      }
    }
    
    goOnOrderDetail(id)
    {
      this.navCtrl.push(OrderDetailPage,{id:id, type:this.order_type})
    }
    
    
    primary_order:any = "1";
    secondary_order:any = "0";
    
    primary()
    {
      this.primary_order = "1";
      this.secondary_order = "0"; 
    }
    
    secondary()
    {
      this.primary_order = "0";
      this.secondary_order = "1"; 
    }
    
    order_type:any;
    primary_count:any=[];
    secondary_count:any=[];
    load_data:any = "0";
    order_List2 :any = []
    order_List3 :any = []
    url:any;
    
    getorderList(status)
    {
      console.log(status);
      this.order_type = status;
      
      this.service.addData({'type':status},"Order/order_list").then((result)=>{
        console.log(result);
        if(result)
        {
          this.order_List = result['data'];
          this.order_List2 = result['data1'];
          this.order_List3 = result['data2'];
          
          
          if(this.order_List== '')
          {
            this.load_data = "1";
          }
          
          if(this.order_List2== '')
          {
            this.load_data = "1";
          }
          this.primary_count = result['primary'];
          this.secondary_count = result['secondary'];
          this.direct_count = result['direct'];
        }
      })
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
    
    
    loadData(infiniteScroll)
    {
      if(this.order_type=='Primary')
      {
        this.service.addData({'type':this.order_type,'limit':this.order_List.length},"Order/order_list").then( result=>
          {
            console.log(result);
            if(result['data']=='')
            {
              this.flag=1;
            }
            else
            {
              setTimeout(()=>{
                this.order_List=this.order_List.concat(result['data']);
                console.log('Asyn operation has stop')
                infiniteScroll.complete();
              },1000);
            }
          });
        }
        else if(this.order_type=='Secondary'){
          // this.limit=this.order_List2.length;
          
          this.service.addData({'type':this.order_type,'limit':this.order_List2.length},"Order/order_list").then( result=>
            {
              console.log(result);
              if(result['data1']=='')
              {
                this.flag=1;
              }
              else
              {
                setTimeout(()=>{
                  this.order_List2=this.order_List2.concat(result['data1']);
                  console.log('Asyn operation has stop')
                  infiniteScroll.complete();
                },1000);
              }
            });
            
          }
          else
          {
            this.service.addData({'type':this.order_type,'limit':this.order_List3.length},"Order/order_list").then( result=>
              {
                console.log(result);
                if(result['data2']=='')
                {
                  this.flag=1;
                }
                else
                {
                  setTimeout(()=>{
                    this.order_List3=this.order_List2.concat(result['data2']);
                    console.log('Asyn operation has stop')
                    infiniteScroll.complete();
                  },1000);
                }
              });
            }
          }          
        }
        