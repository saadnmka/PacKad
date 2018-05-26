import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import {User} from '../../model/user.model';
import {UserAuthProvider} from '../../providers/firebase/userAuth';
import {WelcomePage} from '../welcome/welcome';
import {NextRegistrationPage} from '../next-registration/next-registration';
import {AddConformationCodePage} from '../add-conformation-code/add-conformation-code';
import {HelpersProvider} from '../../providers/firebase/helpers';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {
  user = {} as User ; 
  phoneMess: Observable <string> ; 


  constructor(public navCtrl: NavController, public navParams: NavParams, private userAuth: UserAuthProvider, private alertCtrl:
    AlertController, public help: HelpersProvider ) {

     
  }

  ionViewDidLoad() {
     
  
   
  }

 
  login(phoneNumber: number)
  {
    const phoneNumberString = "+966" + phoneNumber;
    this.phoneMess = this.userAuth.checkIfPhoneExist(phoneNumberString);

    this.phoneMess.subscribe(result=>{
      if(result == 'yes')
      {
        let message = "تم تسجيل هذا الرقم مسبقا"
        this.help.getErrorMessage(message);
      }

      else if (result == "No")
      {
        this.navCtrl.setRoot(AddConformationCodePage , {userPhone:phoneNumberString});
        
      }
    })
  } 

 
}
