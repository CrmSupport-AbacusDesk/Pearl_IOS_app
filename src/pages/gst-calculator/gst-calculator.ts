import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-gst-calculator',
  templateUrl: 'gst-calculator.html',
})
export class GstCalculatorPage {

  data:any={};

  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GstCalculatorPage');
  }

  submit(type)
  {
    console.log(this.data);

    if(!this.data.gst)
    {
      this.data.gst = 0;
    }
    
    if(type == 'Inclusive')
    {
      this.data.saleAmt = (this.data.mrp - (this.data.mrp * (this.data.discount)/100)) + ((this.data.mrp - (this.data.mrp * (this.data.discount)/100)) * (this.data.gst)/100);

      this.data.saleAmt = parseFloat(this.data.saleAmt).toFixed(2);

      this.data.saleOnMktPricePerentage = ((100/100) - (this.data.saleAmt / this.data.mrp))*100;

      this.data.saleOnMktPricePerentage = parseFloat(this.data.saleOnMktPricePerentage).toFixed(2);

      this.data.purchaseAmt = (this.data.mrp - (this.data.mrp * (51)/100)) + ((this.data.mrp - (this.data.mrp * (51)/100)) * (this.data.gst)/100);

      this.data.purchaseAmt = parseFloat(this.data.purchaseAmt).toFixed(2);

      this.data.purchaseProfit = ((this.data.saleAmt - this.data.purchaseAmt) / this.data.purchaseAmt) * 100;

      this.data.purchaseProfit = parseFloat(this.data.purchaseProfit).toFixed(2);
    }

    if(type == 'Exclusive')
    {
      this.data.discountWithoutGst = (this.data.excMrp - (this.data.excMrp * (this.data.excDiscount)/100));

      this.data.discountWithoutGst = parseFloat(this.data.discountWithoutGst).toFixed(2);

      this.data.lessExclusiveGst = (this.data.discountWithoutGst / ((parseInt(this.data.excGst) + 100) / 100) / this.data.excMrp) * 100;

      this.data.lessExclusiveGst = parseFloat(this.data.lessExclusiveGst).toFixed(2);

      this.data.lessExclusiveGst = 100 - this.data.lessExclusiveGst;
    }
    console.log(this.data);
  }

}
