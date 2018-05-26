import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Trip} from '../../model/Trip.model';
import {Passengers} from '../../model/passengers.model';
import { Observable } from 'rxjs';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import {UserAuthProvider} from '../../providers/firebase/userAuth';
import {HistoryDetailsPage} from '../history-details/history-details';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  trip = {} as Trip;
  passenger = {} as Passengers ; 
  TripList$:Observable <any>
  
  TicketKey:string
  OnTrip :any[] = [] ; 
  mess: any ;
  passRef: any ;
  pass$: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams , private database: FirebaseProvider,
  private userAuth: UserAuthProvider ) {
 
    this.passenger = this.userAuth.currentUserId();
    this.pass$ =  this.database.getPassengersList(this.passenger).snapshotChanges();
    this.pass$.subscribe(action=>{
      action.forEach(element=>{
       this.TripList$ = this.database.getTripForpassengers(element.payload.val().TripKey).snapshotChanges()
       .map(changes=>{
        return changes.map( c=>({
          key: c.payload.key, 
          ... c.payload.val(),
        }));
       })   
       this.TripList$.subscribe(result=>{ 
         result.forEach(el=>{
            this.OnTrip.push(el)
          
         })
       });
      })
    })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage'); 
  }


  HistoryDetail(tirp: Trip)
  {
    this.navCtrl.setRoot(HistoryDetailsPage, {tripInfo : tirp , state : 'yes'});

  }

  HistoryDetailWithoutCancel(tirp: Trip)
  {
   
    this.navCtrl.setRoot(HistoryDetailsPage, {tripInfo : tirp , state: 'No'});
  }

}
