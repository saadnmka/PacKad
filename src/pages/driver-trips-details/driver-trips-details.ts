import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController } from 'ionic-angular';
import {Passengers} from '../../model/passengers.model';
import { Observable } from 'rxjs/Observable';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import {UserAuthProvider} from '../../providers/firebase/userAuth';
import { Trip } from '../../model/Trip.model';
import {HelpersProvider} from '../../providers/firebase/helpers';


/**
 * Generated class for the DriverTripsDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-driver-trips-details',
  templateUrl: 'driver-trips-details.html',
})
export class DriverTripsDetailsPage {

  passegers = {} as Passengers;
  passengers$:Observable <any>;
  trip = {} as Trip;
  TotlAmount:any
  price: any
  invoice: any;


  constructor(public navCtrl: NavController, public navParams: NavParams , private database: FirebaseProvider
  , private userAuth:UserAuthProvider , public alertCtrl: AlertController , private helper:HelpersProvider) {

     this.trip= this.navParams.get('tripInfo');
     this.price = this.trip.TripPrice ; 
     this.passengers$ = this.database.getPassengerInfoForOneTrip(this.trip.key).valueChanges();
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverTripsDetailsPage');
  }

  CloseTrip()
  {
    let confirm = this.alertCtrl.create({
      title: 'هل انت متاكد من اكمال الرحلة ؟',
      buttons: [
        {
          text: 'اضافة',
          handler: () => {
           
            this.database.DriverCloseTrip(this.trip.key).then(()=>{
              let mess = "لقد تم اكمال الرحلة"
              this.helper.getErrorMessage(mess);

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
