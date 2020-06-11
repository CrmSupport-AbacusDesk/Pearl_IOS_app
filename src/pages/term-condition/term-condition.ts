import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';

@IonicPage()
@Component({
  selector: 'page-term-condition',
  templateUrl: 'term-condition.html',
})
export class TermConditionPage {

  data:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public serve: MyserviceProvider) 
  {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermConditionPage');
    this.get_term_condition();
  }

  get_term_condition()
  {
    this.serve.addData('','Plumber/get_term_condition').then((result)=>
    {
      console.log(result);
      this.data = result['term_condition'];
    });
  }

}
