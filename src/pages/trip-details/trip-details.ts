import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Trip} from '../../model/Trip.model';
import {AddBokkingInfoPage} from '../add-bokking-info/add-bokking-info';
import {Driver} from '../../model/driver.model';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import { Observable } from 'rxjs';

/**
 * Generated class for the TripDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trip-details',
  templateUrl: 'trip-details.html',
})
export class TripDetailsPage {
  trip = {} as Trip ; 
  driver = {} as Driver ; 
  driverRef : Observable <any>; 

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private database:FirebaseProvider) {
    this.trip = this.navParams.get('tripDetail');
    this.database.getCarData(this.trip.Driverkey).snapshotChanges().subscribe(action=>{
      this.driver.CarType = action.payload.val().CarType;
      this.driver.CarModel = action.payload.val().CarModel;
      this.driver.CarPlateNumber = action.payload.val().CarPlateNumber;
      this.driver.CarDescription = action.payload.val().CarDescription ; 
      this.driver.CarProblem = action.payload.val().CarProblem;

    })
  }

  ionViewWillLoad() {
   
  }

  BookingPage()
  {
    this.navCtrl.push(AddBokkingInfoPage , {TripInfo:this.trip.key , TripPrice: this.trip.TripPrice , DriverKey:this.trip.Driverkey}); 

  }

}
