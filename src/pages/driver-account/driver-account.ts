import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserAuthProvider} from '../../providers/firebase/userAuth';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import { Observable } from 'rxjs/Observable';
import {DriverTripsDetailsPage} from '../../pages/driver-trips-details/driver-trips-details';
import {Trip} from '../../model/Trip.model';
import {PaymentPage} from '../../pages/payment/payment';
import {CarDetailsPage} from '../../pages/car-details/car-details';
/**
 * Generated class for the DriverAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-driver-account',
  templateUrl: 'driver-account.html',
})
export class DriverAccountPage {

  driver: any ;
  acount: any;

  TripList$: Observable <any>;

  constructor(public navCtrl: NavController, public navParams: NavParams , private userAuth:UserAuthProvider
  ,private database:FirebaseProvider) {

    this.driver = this.userAuth.currentUserId();
    this.database.GetDriverAccount(this.driver).subscribe(result=>{
      this.acount = result;
    })


  this.TripList$ =   this.database.getDriverTrips(this.driver).snapshotChanges()
  .map(changes=>{
   return changes.map( c=>({
     key: c.payload.key, 
     ... c.payload.val(),
   }));
  })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverAccountPage'); 
  }


  PaymentPage()
  {
    this.navCtrl.push(PaymentPage);

  }

  TripDetails(trip:Trip)
  {
    this.navCtrl.push(DriverTripsDetailsPage , {tripInfo:trip});
  }

  CarDetails()
  {
    this.navCtrl.push(CarDetailsPage);

  }



}
