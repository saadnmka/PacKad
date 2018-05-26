import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TripPage} from '../trip/trip';
import {Trip} from '../../model/Trip.model';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import { Observable } from 'rxjs/Observable';


/**
 * Generated class for the BookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {

  trip = {} as Trip ; 


  

  ArrivalCity: any;
  DepatureCity : any;
  PassengerNumber: any 
  minDate;
  maxDate;
 citiesName$: Observable<any>;
 


  constructor(public navCtrl: NavController, public navParams: NavParams ,private database: FirebaseProvider) {

    this.citiesName$ = this.database.getCities().snapshotChanges()
    .map(changes=>{
     return changes.map( c=>({
       key: c.payload.key, 
       ... c.payload.val(),
     }));
    })
   
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
  }

  showinfo(trip: Trip)
  {
    trip.tripRef = trip.Departure_City+"_" +trip.Arrival_city +"_"+ trip.Date;
    this.navCtrl.push(TripPage, {TripInfo: trip});
  }

}
