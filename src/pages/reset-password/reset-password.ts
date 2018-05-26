import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserAuthProvider} from '../../providers/firebase/userAuth';
import {HelpersProvider} from '../../providers/firebase/helpers';
/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

   Email ; 
  constructor(public navCtrl: NavController, public navParams: NavParams, private userAuth:UserAuthProvider
  ,private helper: HelpersProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

  SendEmail(Email)
  {
    this.userAuth.resetPassword(Email).then(()=>{
    })
    .catch(()=>{
        let mess = "الايميل المدخل غير موجود ";
        this.helper.getErrorMessage(mess);
    })
  }

}
