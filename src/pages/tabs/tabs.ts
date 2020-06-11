import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { ContactusPage } from '../contactus/contactus';
import { EnquiryPage } from '../enquiry/enquiry';
import {NavController, NavParams} from 'ionic-angular';
import { DistributorListPage } from '../sales-app/distributor-list/distributor-list';
import { OrderListPage } from '../order-list/order-list';
import { FollowupPage } from '../followup/followup';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { SearchPage } from '../search/search';
import { AboutusPage } from '../aboutus/aboutus';
import * as $ from 'jquery';
import { AttendencePage } from '../attendence/attendence';
import { CheckinListPage } from '../sales-app/checkin-list/checkin-list';
import { DealerListPage } from '../sales-app/dealer-list/dealer-list';
import { DirectDealerListPage } from '../sales-app/direct-dealer-list/direct-dealer-list';
import { DashboardPage } from '../dashboard/dashboard';
import { MainDistributorListPage } from '../sales-app/main-distributor-list/main-distributor-list';
import { CatalougePage } from '../catalouge/catalouge';
import { WalletHistoryPage } from '../wallet-history/wallet-history';
import { MyWalletPage } from '../my-wallet/my-wallet';
import { Storage } from '@ionic/storage';
import { MenuPage } from '../menu/menu';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  
  tab1Root = HomePage;
  tab2Root = AboutusPage;
  tab3Root = ContactusPage;
  tab4Root = EnquiryPage;
  tab5Root = SearchPage;
  tab6Root = DistributorListPage;
  tab7Root = OrderListPage;
  tab8Root = FollowupPage;
  tab9Root = CatalougePage;
  tab10Root = CheckinListPage;
  tab11Root = CatalougePage;
  tab12Root = AttendencePage;
  tab13Root = DealerListPage;
  tab14Root = DirectDealerListPage;
  tab15Root = DashboardPage;
  tab16Root = MainDistributorListPage;
  tab17Root = MyWalletPage;
  tab18Root = WalletHistoryPage;
  tab19Root = MenuPage;
  
  data:any;
  userlogin:any;
  user_type:any;
  plumber_detail:any=[];
  tab_view:boolean=false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public serve:MyserviceProvider, private storage:Storage)
  {
    this.userlogin=this.serve.get();
    
    this.storage.get('user_type').then((type) => 
    {
      this.user_type = type;
      console.log(this.user_type);
    });
    
    this.serve.addData('','Plumber/plumber_deatil').then((result)=>
    {
      this.plumber_detail = result;
      
      if(this.user_type == 4 && this.plumber_detail && this.plumber_detail.status == 'Pending')
      {
        this.tab_view = false;
      }
      else if(this.user_type == 4 && this.plumber_detail && this.plumber_detail.status == 'Approved')
      {
        this.tab_view = true;
      }
      
      console.log(this.tab_view);
    });
    
    
    
    
    
    
  }
  
  
  
  
  // ionViewDidLoad() 
  // {
  // setTimeout(() => {
  
  //   for (let index = 0; index < 40; index++) {
  //     $('#tab-t'+index+'-4, #tab-t'+index+'-5, #tab-t'+index+'-6, #tab-t'+index+'-7, #tab-t'+index+'-8, #tab-t'+index+'-9,#tab-t'+index+'-10,#tab-t'+index+'-11,#tab-t'+index+'-12, #tab-t'+index+'-13,#tab-t'+index+'-14,#tab-t'+index+'-15,#tab-t'+index+'-16').hide();
  //   }
  // });
  // }
  
}
