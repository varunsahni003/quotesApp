import { Component } from '@angular/core';
import { IonicPage, NavParams, ModalController } from 'ionic-angular';
import { Quote } from '../../data/quote.interface';
import { QuotesService } from '../../services/quotes';
import { QuotePage } from '../quote/quote';
import { SettingsService } from '../../services/settings';

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  quotes: Quote[];

  constructor(private quotesService: QuotesService,
    private modalctrl: ModalController,
    private settingService: SettingsService) {

  }
  ionViewWillEnter() {
    this.quotes = this.quotesService.getFavouriteQuotes();
  }
  onViewQuote(quote: Quote) {
    const modal = this.modalctrl.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss((remove: boolean) => {
      if(remove) {
        // this.quotesService.removeQuoteFromFavourites(quote);
        // this.quotes = this.quotesService.getFavouriteQuotes();
        this.onRemoveFromFavourites(quote);
      }
    });
  }

  onRemoveFromFavourites(quote) {
    this.quotesService.removeQuoteFromFavourites(quote);
    this.quotes = this.quotesService.getFavouriteQuotes();
  }

  getBackground() {
    return this.settingService.isAltBackground() ? 'altQuoteBackground' : 'quoteBackground';
  }
}
