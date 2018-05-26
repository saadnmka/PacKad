import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import { Observable } from 'rxjs/Observable';
import {Trip} from '../../model/Trip.model';
import {TripDetailsPage} from '../trip-details/trip-details';
import {HelpersProvider} from '../../providers/firebase/helpers';
import {BookingPage} from '../booking/booking';
import { User } from '../../model/user.model';
import {UserAuthProvider} from '../../providers/firebase/userAuth';
/**
 * Generated class for the TripPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trip',
  templateUrl: 'trip.html',
})
export class TripPage {


  
  state: any ;

  Titel: string ; 
  trip= {} as Trip;
  TripList$ : Observable <any>;
  constructor(public navCtrl: NavController, public navParams: NavParams ,private database: FirebaseProvider
  ,private help: HelpersProvider , private userAuth: UserAuthProvider) {
  
  
     this.trip = this.navParams.get('TripInfo');
     this.TripList$ = this.database.getOneTrip(this.trip).snapshotChanges()
     .map(changes=>{
      return changes.map( c=>({
        key: c.payload.key, 
        ... c.payload.val(),
      }));
     })

     this.TripList$.subscribe(result=>{
       if(result.length== 0)
       {
         let mess ="عفوا، لايوجد رحلات مطابقة للمعلومات المدخلة"
         this.help.getErrorMessage(mess);
         this.navCtrl.setRoot(BookingPage);
       }
     }); 
    
  }



  TripDetails(trip: Trip)
  {
    this.navCtrl.push(TripDetailsPage , {tripDetail: trip});
    
  }



}
