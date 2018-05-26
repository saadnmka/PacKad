import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserAuthProvider} from '../../providers/firebase/userAuth';
import firebase from 'firebase';
import {NextRegistrationPage} from '../next-registration/next-registration';
/**
 * Generated class for the AddConformationCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-conformation-code',
  templateUrl: 'add-conformation-code.html',
})
export class AddConformationCodePage {

   PhoneNumber ;
   public recaptchaVerifier; 
   conformCode: any;
   conformationResult ; 

  constructor(public navCtrl: NavController, public navParams: NavParams , private userAuth: UserAuthProvider) {

    this.PhoneNumber = this.navParams.get('userPhone');
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
    });

    this.userAuth.SinInWithPhone(this.PhoneNumber , this.recaptchaVerifier).then(conformation=>{
        this.conformationResult = conformation;
        console.log(this.conformationResult);
      
    }).catch(error=>{
      console.log(error);
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddConformationCodePage');
  }

  Conform()
  {
    this.conformationResult.confirm(this.conformCode).then(result=>{

      this.navCtrl.setRoot(NextRegistrationPage , {phoneNumber: this.PhoneNumber});
    })

  }

}
