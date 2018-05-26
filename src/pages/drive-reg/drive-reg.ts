import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Driver} from '../../model/driver.model';
import {UserAuthProvider} from '../../providers/firebase/userAuth';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import {HelpersProvider} from '../../providers/firebase/helpers';
import {DrivRegCompletePage} from '../../pages/driv-reg-complete/driv-reg-complete'
/**
 * Generated class for the DriveRegPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-drive-reg',
  templateUrl: 'drive-reg.html',
})
export class DriveRegPage {
  driver = {} as Driver 

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private userAuth: UserAuthProvider , private database: FirebaseProvider , private helper:HelpersProvider) {
    this.driver.DriverKey = this.userAuth.currentUserId();
    this
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriveRegPage');
  }

  DriverRigestraion(driver)
  {
    this.database.addUserAsDriver(driver).then(()=>{
      this.navCtrl.setRoot(DrivRegCompletePage); 
    })
 
  }

}
