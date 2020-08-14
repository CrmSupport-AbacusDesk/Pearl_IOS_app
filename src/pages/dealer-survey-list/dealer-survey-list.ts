import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DealerSurveyPage } from '../dealer-survey/dealer-survey';
import { MyserviceProvider } from '../../providers/myservice/myservice';

@IonicPage()
@Component({
  selector: 'page-dealer-survey-list',
  templateUrl: 'dealer-survey-list.html',
})
export class DealerSurveyListPage {
  
  load_data:any = "0";
  limit=0;
  flag:any='';
  search:any;
  delaer_survey_list:any=[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: MyserviceProvider, public loadingCtrl: LoadingController) 
  {
    
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad DealerSurveyListPage');
  }
  
  ionViewWillEnter()
  {
    this.getDealerSurveyList();
  }
  
  getDealerSurveyList()
  {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    }); 
    loading.present();
    
    this.service.addData({'limit':this.limit,'company_name':this.search},'Distributor/dealer_survey_list').then((result)=>{
      console.log(result);
      this.delaer_survey_list = result;
      loading.dismiss();
      
      if(this.delaer_survey_list.length == 0)
      {
        this.load_data = "1";
      }
    }).catch((error):any=>
    {
      loading.dismiss();
    });
    
  }
  
  loadData(infiniteScroll)
  {
    console.log('loading');
    
    this.service.addData({'limit':this.delaer_survey_list.length},'Distributor/dealer_survey_list').then(result=>
      {
        console.log(result);
        if(result=='')
        {
          this.flag=1;
        }
        else
        {
          setTimeout(()=>{
            this.delaer_survey_list=this.delaer_survey_list.concat(result);
            infiniteScroll.complete();
          },1000);
        }
      });
    }
    
    goToDealerSurvey()
    {
      this.navCtrl.push(DealerSurveyPage);
    }
    
    dealer_survey_edit(dr_id)
    {
      this.navCtrl.push(DealerSurveyPage,{dr_id:dr_id});
    }
    
  }
  