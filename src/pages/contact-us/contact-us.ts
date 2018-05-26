import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController } from 'ionic-angular';
import {Claim} from '../../model/claim.model';
import {UserAuthProvider} from '../../providers/firebase/userAuth';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import {HelpersProvider} from '../../providers/firebase/helpers';

/**
 * Generated class for the ContactUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {

  public backgroundImage = 'assets/imgs/sysback.jpg';
  ContactPhoneNumber;
  ContactEmail;

  claim = {} as Claim
  city:any;
  constructor(public navCtrl: NavController, public navParams: NavParams , private userAuth: UserAuthProvider
  ,private alertCtrl:AlertController , private database: FirebaseProvider , private helper:HelpersProvider ) {


    this.ContactEmail = "Email@gmail.com";
    this.ContactPhoneNumber = "05998899009";
    this.userAuth.getDriverName().subscribe(item=>{
      this.claim.UserName = item;
    })

    this.claim.UserID = this.userAuth.currentUserId();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUsPage'); 
  }


  SendCaim(claim)
  {
    let confirm = this.alertCtrl.create({
      title: 'هل انت متاكد من تقديم الشكوى ؟',
      buttons: [
        {
          text: 'تقديم',
          handler: () => {
             this.database.AddCalim(claim).then(()=>{
               let mess = "لقد تم تقديم الشكوى ، وسوف نتواصل معك في اقرب وقت ممكن";
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

  addcity(city)
  {
    this.database.addCity(city);
  }
}
