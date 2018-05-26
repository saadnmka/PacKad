import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from '../../model/user.model';
import {UserAuthProvider} from '../../providers/firebase/userAuth';
import {WelcomePage} from '../welcome/welcome';

/**
 * Generated class for the NextRegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-next-registration',
  templateUrl: 'next-registration.html',
})
export class NextRegistrationPage {

  user = {} as User ; //model of the user 
  LinkedUser ;  // the user of the registered user

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private userAuth: UserAuthProvider) {

    this.user.PhoneNumber = this.navParams.get('phoneNumber');
    this.user.role = "User";
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NextRegistrationPage');
  }

  login(user)
  {
    this.userAuth.SignIN(user).then(()=>{
        this.navCtrl.setRoot(WelcomePage);
    })
  }

}
