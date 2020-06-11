import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';

@IonicPage()
@Component({
  selector: 'page-plumber-profile',
  templateUrl: 'plumber-profile.html',
})
export class PlumberProfilePage {
  
  plumber_detail:any=[];
  name_first_letter:any;
  loading: any;
  contact_detail:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public serve: MyserviceProvider,public loadingCtrl:LoadingController) 
  {
    
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad PlumberProfilePage');
  }
  
  ionViewWillEnter()
  {
    this.plumber_data();
    this.contact_data();
  }
  
  plumber_data()
  {
    this.show_loading();

    this.serve.addData('','Plumber/plumber_deatil').then((result)=>
    {
      console.log(result);
      this.plumber_detail = result;
      this.name_first_letter = this.plumber_detail.name.substring(0,1).toUpperCase();
      this.loading.dismiss();
    });
  }

  contact_data()
  {
    this.serve.addData('','Plumber/get_term_condition').then((result)=>
    {
      this.contact_detail = result['contact_mobile_no'];
    });
  }

  show_loading()
      {
        this.loading = this.loadingCtrl.create({
          spinner: 'hide',
          content: `<img src="./assets/imgs/gif.svg"/>`,
          dismissOnPageChange: false
        });
        this.loading.present();
      }
}

