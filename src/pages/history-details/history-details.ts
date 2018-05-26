import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams  , AlertController} from 'ionic-angular';
import {Trip} from '../../model/Trip.model';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import {Passengers} from '../../model/passengers.model';
import {UserAuthProvider} from '../../providers/firebase/userAuth';
import { Observable } from 'rxjs';
import {HelpersProvider} from '../../providers/firebase/helpers';
import {HistoryPage} from '../../pages/history/history';

/**
 * Generated class for the HistoryDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history-details',
  templateUrl: 'history-details.html',
})

export class HistoryDetailsPage {
  trip = {} as Trip ; 
  state:string ; 
 pass$: Observable<any>;
  passenger = {} as Passengers
  passRef: any ; 
  User:any ; 
  constructor(public navCtrl: NavController, public navParams: NavParams , private database:FirebaseProvider
   ,private userAuth: UserAuthProvider , private helper: HelpersProvider , private alertCtrl : AlertController ) {
    this.trip = this.navParams.get('tripInfo');
    this.state = this.navParams.get('state');
    this.User = this.userAuth.currentUserId();
    this.passRef = this.User + this.trip.key;

     this.pass$ = this.database.GetPassengersRefrence(this.passRef).snapshotChanges()
    .map(changes=>{
     return changes.map( c=>({
       key: c.payload.key, 
       ... c.payload.val(),
     }));
    })

  }

  ionViewDidLoad() {
    
  }

  CancelTrip(passenger: Passengers)
  {
    let confirm = this.alertCtrl.create({
      title: 'هل انت متاكد من اغلاق الرحلة ؟',
      buttons: [
        {
          text: 'اغلاق',
          handler: () => {
           
            let Percentage = this.helper.getpercentage(passenger.passengersNumber , this.trip.TripPrice);
            this.database.CancelPassenger(passenger , this.trip.Driverkey ,  Percentage);
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

  GoBack()
  {
    this.navCtrl.setRoot(HistoryPage);
  }

} 
