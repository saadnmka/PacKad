import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BookingPage} from '../booking/booking';
import {HistoryPage} from '../history/history';
import {DriveRegPage} from '../drive-reg/drive-reg';
import {ProfilePage} from '../profile/profile';
import {UserAuthProvider} from '../../providers/firebase/userAuth';
import {LoginPage} from '../../pages/login/login';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import {ContactUsPage} from '../../pages/contact-us/contact-us';


/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  public backgroundImage = 'assets/imgs/sysback.jpg';


  constructor(public navCtrl: NavController, public navParams: NavParams , private userAuth:UserAuthProvider
  ,private database: FirebaseProvider) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
  

  BookingPage(Page)
  {
    this.navCtrl.setRoot(BookingPage);
  }

  HistoryPage()
  {
    this.navCtrl.setRoot(HistoryPage);
  }

  ContactUs()
  {
    this.navCtrl.setRoot(ContactUsPage);
  }

  ProfilePage()
  {
    this.navCtrl.setRoot( ProfilePage);
  }

  LogOut()
  {
    this.userAuth.logOut().then(()=>{
      this.navCtrl.setRoot(LoginPage);
    })
    
  }
}
