import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserAuthProvider} from '../../providers/firebase/userAuth';
import {LoginPage} from '../../pages/login/login';

/**
 * Generated class for the DrivRegCompletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-driv-reg-complete',
  templateUrl: 'driv-reg-complete.html',
})
export class DrivRegCompletePage {

  constructor(public navCtrl: NavController, public navParams: NavParams , private userAuth:UserAuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DrivRegCompletePage');
  }


  BacktoLogin()
  {
    this.userAuth.logOut().then(()=>{
      this.navCtrl.setRoot(LoginPage)
    })
    
  }

}
