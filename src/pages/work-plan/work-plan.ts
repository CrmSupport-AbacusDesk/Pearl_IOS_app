import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-work-plan',
  templateUrl: 'work-plan.html',
})
export class WorkPlanPage {
  
  data:any={};
  currentDate: any = new Date().toJSON().split('T')[0];
  todayDate:any;
  // show:boolean = false;
  // show1:boolean = false;
  workPlanData:any=[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public serve: MyserviceProvider,public toastCtrl: ToastController) 
  {
    this.todayDate = moment(this.currentDate).format('YYYY-MM-DD');

    this.data.date = this.todayDate;
    this.checkWorkPlan();
  }
  
  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad WorkPlanPage');
  }
  
  // submitWorkPlan()
  // {
  //   this.data.todayDate = this.todayDate;
    
  //   this.serve.addData(this.data,'Distributor/submitWorkPlan').then((result)=>
  //   {
  //     console.log(result);
      
  //     if(result == true)
  //     {
  //       let toast = this.toastCtrl.create({
  //         message: 'Work Plan Saved Successfully!',
  //         duration: 3000
  //       });

  //       toast.present();
  //     }
  //   })
  // }
  
  checkWorkPlan()
  {
    this.workPlanData = [];

    // this.data.month = moment(this.data.date).format('M');
    // this.data.year = moment(this.data.date).format('YYYY');
    
    this.serve.addData(this.data,'Distributor/checkWorkPlan').then((result)=>
    {
      console.log(result);
      if(result != null) this.workPlanData = result;
      
      if(this.workPlanData != null)
      {
        this.data.orderAmt = this.workPlanData.orderAmt;
        this.data.visitOldCounter = this.workPlanData.visitOldCounter;
        this.data.visitNewCounter = this.workPlanData.visitNewCounter;
        // this.show = true;
      }
      // else
      // {
      //   this.show = false;
      // }
      
      // if(this.todayDate < this.data.date)
      // {
      //   this.show = false;
      // }
      // else
      // {
      //   this.show = true;
      // }
    });
  }
  
}
