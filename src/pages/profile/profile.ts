import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController } from 'ionic-angular';
import {User} from '../../model/user.model';
import {UserAuthProvider} from '../../providers/firebase/userAuth';
import { Observable } from 'rxjs/Observable';
import {HelpersProvider} from '../../providers/firebase/helpers';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  

UserDriverState: string ;
fileRef: Observable <any>;
user = {} as User ; 
imageUrl: "assets/imgs/profile.png"


  constructor(public navCtrl: NavController, public navParams: NavParams ,private userAuth: UserAuthProvider
  ,private helper: HelpersProvider , private alertCtrl: AlertController ) {
  
    this.userAuth.userProfile().snapshotChanges().subscribe(action=>{
      this.user.Key = action.key;
      this.user.Name = action.payload.val().Name;
      this.user.City = action.payload.val().City;
      this.user.Email = action.payload.val().Email;
      this.user.PhoneNumber = action.payload.val().PhoneNumber;
      this.user.Password = action.payload.val().Password;
      this.user.role = action.payload.val().role; 

    }) 
   
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  Update(user: User)
  {


    let confirm = this.alertCtrl.create({
      title: ' هل انت متاكد من تغير المعلومات ؟',
      buttons: [
        {
          text: 'تغيير',
          handler: () => {
            this.userAuth.UpdateUserProfile(user).then(()=>{
              this.userAuth.UserUpdateEmail(user.Email).then(()=>{
                let mess = "تم تعديل البيانات بنجاح"
                this.helper.getErrorMessage(mess);
        
              })
               
              }
            )
  
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

  //////
  UpdatePassowrd(UserPassowrd)
  {
    
    let confirm = this.alertCtrl.create({
      title: ' هل انت متاكد من تغير كلمة السر ؟',
      buttons: [
        {
          text: 'تغيير',
          handler: () => {
          this.userAuth.UpdatePassowrd(UserPassowrd).then(()=>{
            let mess = "تم تغيير كلمة السر";
            this.helper.getErrorMessage(mess)
          })
          .catch(()=>{
            let mess = "يوجد خطا   ";
            this.helper.getErrorMessage(mess)
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
