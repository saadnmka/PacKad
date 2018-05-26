import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController } from 'ionic-angular';
import {Passengers} from '../../model/passengers.model'
import {UserAuthProvider} from '../../providers/firebase/userAuth';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import {HelpersProvider} from '../../providers/firebase/helpers';
import {BookingPage} from '../../pages/booking/booking';

/**
 * Generated class for the AddBokkingInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-bokking-info',
  templateUrl: 'add-bokking-info.html',
})
export class AddBokkingInfoPage {

  passenger = {} as Passengers ; 
  TripPrice: any ;
  TripDriverKey;  

  

  constructor(public navCtrl: NavController, public navParams: NavParams , private userAuth:UserAuthProvider 
  ,private database: FirebaseProvider , private helper: HelpersProvider , public alertCtrl: AlertController) {

    this.passenger.PassengerKey = this.userAuth.currentUserId();
    this.passenger.TripKey = this.navParams.get('TripInfo');
    this.TripPrice = this.navParams.get('TripPrice');
    this.TripDriverKey = this.navParams.get('DriverKey');
    this.userAuth.getDriverName().subscribe(item=>{
      this.passenger.PassengerName = item;
    })

    this.userAuth.getPhoneNumber().subscribe(item=>{
      this.passenger.PassengersPhone = item ; 
    })

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddBokkingInfoPage');
  }

  BookTrip(passenger: Passengers)
  {
    if(passenger.passengersNumber == null)
    {
        let mess = "الرجاء اختيار عدد الركاب";
        this.helper.getErrorMessage(mess)
    }
    else
    {

      let confirm = this.alertCtrl.create({
        title: 'هل انت متاكد من حجز الرحله ؟',
        buttons: [
          {
            text: 'حجز',
            handler: () => {
                    
         
               let DriverAcount =  this.helper.getpercentage(this.passenger.passengersNumber ,this.TripPrice )  
                passenger.PassengerState = "waiting";
                passenger.PassengerRef = passenger.PassengerKey + passenger.TripKey ;     
                this.database.addPassengers(passenger , this.TripDriverKey , DriverAcount); 
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

  BacToSearch()
  {

    let confirm = this.alertCtrl.create({
      title: 'هل انت متاكد من الرجوع الى صفحة البحث  ؟',
      buttons: [
        {
          text: 'رجوع',
          handler: () => {
                  
              this.navCtrl.setRoot(BookingPage);
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
