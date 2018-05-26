import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController } from 'ionic-angular';
import {Driver} from '../../model/driver.model';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import {UserAuthProvider} from '../../providers/firebase/userAuth';
import {HelpersProvider} from '../../providers/firebase/helpers'

/**
 * Generated class for the CarDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-car-details',
  templateUrl: 'car-details.html',
})
export class CarDetailsPage {
  driver = {} as Driver ; 
 driverKey ; 
  constructor(public navCtrl: NavController, public navParams: NavParams
  ,private database:FirebaseProvider , private userAuth:UserAuthProvider , private alertCtrl: AlertController , private helper: HelpersProvider) {

    this.driverKey = this.userAuth.currentUserId();
    this.database.getCarData(this.driverKey).snapshotChanges().subscribe(result=>{
      this.driver.CarType = result.payload.val().CarType;
      this.driver.CarModel = result.payload.val().CarModel;
      this.driver.CarPlateNumber = result.payload.val().CarPlateNumber;
      this.driver.CarDescription = result.payload.val().CarDescription ; 
      this.driver.CarProblem = result.payload.val().CarProblem;
    });





  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarDetailsPage');
  }


  UpdateCarInfo(driver: Driver)
  {
    let confirm = this.alertCtrl.create({
      title: ' هل انت متاكد من تغير المعلومات ؟',
      buttons: [
        {
          text: 'تغيير',
          handler: () => {
              this.database.UpdateCarInfo(this.driverKey , driver).then(()=>{
                let mess = "تم تغيير  معلومات السيارة";
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
