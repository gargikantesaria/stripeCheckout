import { Component, HostListener } from '@angular/core';
import { NavController } from 'ionic-angular';
declare var StripeCheckout;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  handler:any;
  constructor(public navCtrl: NavController) { }

  ionViewDidLoad(){
    setTimeout(() => {
      this.handler =  StripeCheckout.configure({
        key: 'YOUR_STRIPE_KEY',
        image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
        locale: 'auto',
        amount: 100,
        token: token => {
          console.log("Token is", token)
        }
      })
      console.log("See the stripe data", this.handler);
    }, 1000)
  }

  handlerOpen(){
    this.handler.open({
      name: 'Test App name',
      amount: 100
    });
  }

  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close();
  }

  payButtonClickHandler(){
    this.handlerOpen();
  }
}
