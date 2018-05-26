import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController } from 'ionic-angular';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import {HelpersProvider} from '../../providers/firebase/helpers';
import {UserAuthProvider} from '../../providers/firebase/userAuth';
import { Payment } from '../../model/payment.model';


/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  driver: any ; 
  DriverName ;
  payment = {} as Payment
  constructor(public navCtrl: NavController, public navParams: NavParams
  ,private database: FirebaseProvider , private userAuth: UserAuthProvider, private helper: HelpersProvider 
,private alertCtrl: AlertController) {
  
    this.payment.UserId = this.userAuth.currentUserId();
     this.userAuth.getDriverName().subscribe(result=>{
      this.payment.UserName = result ; 
     })


    // console.log(this.payment.UserName);
  }
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }


  MakItZero()
  {
    this.database.MakeitZero(this.driver);

  }

  sendPayment(payment: Payment)
  {

    let confirm = this.alertCtrl.create({
      title: 'دفع المستحقات؟',
      buttons: [
        {
          text: 'دفع',
          handler: () => {
              this.database.addPayment(payment).then(()=>{
              let mess = "لقد تم استلام الفاتورة";
              this.helper.getErrorMessage(mess);
    })
          }
        },
        {
          text: 'رجوع',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

}
