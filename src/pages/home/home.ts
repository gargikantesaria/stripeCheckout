import { Component, HostListener } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
declare var StripeCheckout;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  handler:any;
  constructor(public navCtrl: NavController, private alertCtrl: AlertController) { }

  ionViewDidLoad(){
    setTimeout(() => {
      this.handler =  StripeCheckout.configure({
        key: 'YOUR_STRIPE_KEY',
        image: 'https://stripe.com/img/documentation/checkout/marketplace.png', // Picture you want to show in pop up
        locale: 'auto',
        token: token => {
          // Handle Stripe response
          let alert=this.alertCtrl.create({
            title: 'Response from Stripe',
            message: JSON.stringify(token),
            buttons:['ok']
          });
            alert.present();
        }
      })
    }, 1000)
  }

  handlerOpen(){
    this.handler.open({
      name: 'Test App name', // Pass your application name
      amount: 100 // Pass your billing amount
    });
  }

  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close(); // To close the pop-up
  }

  payButtonClickHandler(){
    this.handlerOpen(); // To open your stripe pop-up
  }
}
