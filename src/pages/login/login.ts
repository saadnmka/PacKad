import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , MenuController } from 'ionic-angular';
import {BookingPage} from '../booking/booking';
import {RegistrationPage} from '../registration/registration';
import {WelcomePage} from '../welcome/welcome';
import {User} from '../../model/user.model';
import {UserAuthProvider} from '../../providers/firebase/userAuth';
import {HelpersProvider} from '../../providers/firebase/helpers';
import {ResetPasswordPage} from '../../pages/reset-password/reset-password';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

 user = {} as User;
 menue : string;
list$: Observable <any>

  public backgroundImage = 'assets/imgs/beautiful-color-ui-gradients-backgrounds-royal.png';

  constructor(public navCtrl: NavController, public navParams: NavParams , public menueCont : MenuController, private userAuth: UserAuthProvider
  ,private helper: HelpersProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(user:User)
  {
    
   
      this.userAuth.LogIn(user).then(resolve=>{
      this.userAuth.getRoleType().subscribe(result=>{
        Object.keys(result).map(k => this.menueCont.enable(false, result[k]));
        this.menueCont.enable(true,result);
        this.navCtrl.setRoot(WelcomePage);
       })

     })
     .catch(()=>{
       let mess = "الرجاء التاكد من اسم المستخدم وكلمة المرور";
       this.helper.getErrorMessage(mess);
     })
    
  }

  goToSignup()
  {
    this.navCtrl.push(RegistrationPage);
  }

  ResetPassowrdPage()
  {
    this.navCtrl.push(ResetPasswordPage);
  }

}
