import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MyserviceProvider } from '../../../providers/myservice/myservice';
import { AddCpOrderPage } from '../add-cp-order/add-cp-order';
import { OrderDetailPage } from '../../order-detail/order-detail';

@IonicPage()
@Component({
  selector: 'page-cp-order-list',
  templateUrl: 'cp-order-list.html',
})
export class CpOrderListPage {
  
  orderType:any;
  order_List:any=[];
  primaryCount:any=0;
  secondaryCount:any=0;
  flag:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:MyserviceProvider, public loadingCtrl: LoadingController) 
  {
    // this.orderType = this.navParams.get('orderType');  
    
    // this.getorderList(this.orderType);
  }

  ionViewWillEnter()
  {
    this.orderType = this.navParams.get('orderType'); 

    this.getorderList(this.orderType);
  }
  
  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad CpOrderListPage');
  }
  
  getorderList(status)
  {
    this.lodingPersent();
    
    this.service.addData({'type':status},"channelPartner/cp_order_list").then((result)=>{
      console.log(result);
      if(result)
      {
        this.order_List = result['data'];
        this.primaryCount = result['primary'];
        this.secondaryCount = result['secondary'];
      }
      this.loading.dismiss();
    }).catch((error:any)=>
    {
      this.loading.dismiss();
    });
  }
  
  addCpOrder()
  {
    this.navCtrl.push(AddCpOrderPage);
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
    if(this.orderType=='Primary')
    {
      this.service.addData({'type':this.orderType,'limit':this.order_List.length},"channelPartner/cp_order_list").then( result=>
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
      else if(this.orderType=='Secondary')
      {  
        this.service.addData({'type':this.orderType,'limit':this.order_List.length},"channelPartner/cp_order_list").then( result=>
          {
            console.log(result);
            if(result['data1']=='')
            {
              this.flag=1;
            }
            else
            {
              setTimeout(()=>{
                this.order_List=this.order_List.concat(result['data1']);
                console.log('Asyn operation has stop')
                infiniteScroll.complete();
              },1000);
            }
          });
          
        }
      }

      goToOrderDetail(orderId)
      {
        this.navCtrl.push(OrderDetailPage,{id:orderId, type:this.orderType, userType:'cpOrder'});
      }
      
    }
    