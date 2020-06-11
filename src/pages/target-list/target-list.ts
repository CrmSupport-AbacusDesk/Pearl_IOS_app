import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-target-list',
  templateUrl: 'target-list.html',
})
export class TargetListPage {

  day= moment().endOf('month');

  userTargetData:any={};
  data:any={};
  financialYearList:any=[];
  currentDate: any = new Date().toJSON().split('T')[0];
  current_month: any = moment().format('MMMM');
  current_year: any = moment().format('YYYY');
  current_month_no: any = moment().format('M');
  salesUserList:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:MyserviceProvider, public popoverCtrl: PopoverController) {
    this.data.user_id=this.navParams.get('id');
    if(this.data.user_id)
    {
      this.getTargetList(this.current_month,moment(this.currentDate).format('YYYY'),this.data.user_id);
    }
    else
    {
      this.getTargetList(this.current_month,moment(this.currentDate).format('YYYY'),this.data.user_id);
    }
  }

  ionViewDidLoad() {
    this.getFinancialYear();
    this.getSalesUserList();
    console.log('ionViewDidLoad TargetListPage');
  }

  selectedMonth:any;
  primary_dsr:any;
  secondary_dsr:any;

  getTargetList(month,year,userId)
  {
    console.log(userId);
    

    this.data.days=moment().endOf(month);
    this.data.month=moment().month(month).format("M");
    this.current_month_no = moment().month(month).format("M");
    this.data.selectedMonth=month;
    this.data.year=year;
    this.service.addData({month:this.data.month,year:this.data.year,user_id:this.data.user_id},"Order/targetData").then((result)=>
    {
      console.log(result);
      this.userTargetData=result;

      this.calculate_drr();
    })
  }


  getFinancialYear()
  {
    console.log(this.current_month);
    this.service.addData("","Order/financial_year").then((result)=>{
      console.log(result);
      this.financialYearList=result['year'];

      for(var i =0; i<this.financialYearList.length; i++)
      {
        this.financialYearList[i]['month_no'] = moment().month(this.financialYearList[i]['month']).format("M");
      }
      console.log(this.financialYearList);
      
      this.calculate_drr();
    })
  }

  getMonthData(month)
  {
    console.log(month);

    // let num=moment(month).format('M');
    console.log(moment().month(month).format("M"));

  }

  getSalesUserList()
  {
    this.service.addData({},'Order/assigned_users').then((result)=>{
      console.log(result);
      this.salesUserList=result;
    })
  }

  pri_balance:any=0;
  sec_balance:any=0;

  calculate_drr()
  {
    console.log(this.financialYearList[0]);
    console.log(this.userTargetData);

    if(this.financialYearList[0] && this.userTargetData)
    {
      this.pri_balance = this.userTargetData.pri_target - this.userTargetData.pri_achivement;
      this.pri_balance = parseInt(this.pri_balance);
      this.primary_dsr = this.pri_balance / this.financialYearList[0]['no_of_days'];
    }

    if(this.financialYearList[0] && this.userTargetData)
    {
      this.sec_balance = this.userTargetData.sec_target - this.userTargetData.sec_achivement;
      this.sec_balance = parseInt(this.sec_balance);
      this.secondary_dsr = this.sec_balance / this.financialYearList[0]['no_of_days'];
    }
  }

  // presentPopover(myEvent) {
  //   const popover = this.popoverCtrl.create(FilterpopupComponent);
  //   // popover.present({
  //   //   ev: myEvent
  //   // });
  //   popover.present();
  // }

}
