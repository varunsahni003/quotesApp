import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController } from 'ionic-angular';
import { Quote } from '../../data/quote.interface';
import { QuotesService } from '../../services/quotes';

@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit{
  quoteGroup: { category: string, quotes: Quote[], icon: string }

  constructor(
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private quotesService: QuotesService) {
  }

  // ionViewDidLoad() {
  //   this.quoteGroup = this.navParams.data;
  // Use elvis operator (?) in template in order to use viewDidLoad
  // }
  ngOnInit() {
    this.quoteGroup = this.navParams.data;
    console.log(this.quoteGroup);
  }
  onAddToFavourite(selectedQuote: Quote) {
    const alert = this.alertCtrl.create({
      title: 'Add Quote',
      // subTitle: 'Are you sure?',
      message: 'Are you sure you want to add quote?',
      // buttons: ['Ok']
      buttons: [
        {
          text: 'Yes, go ahead',
          handler: () => {
            console.log('Ok');
            this.quotesService.addQuoteToFavourites(selectedQuote);
          }
        },
        {
          text: 'No, I changed my mind!',
          role: 'cancel',
          handler: () => {
            console.log('No');
          }
        }
      ]
    });
    alert.present();
  }
}
