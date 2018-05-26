import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController } from 'ionic-angular';
import {Trip} from '../../model/Trip.model';
import {UserAuthProvider} from '../../providers/firebase/userAuth';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import { Observable } from 'rxjs/Observable';
import {HelpersProvider} from '../../providers/firebase/helpers';
import {User} from '../../model/user.model';


/**
 * Generated class for the AddTripPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-trip',
  templateUrl: 'add-trip.html',
})
export class AddTripPage {

  trip = {} as Trip ; 
  citiesName$: Observable<any>;



  constructor(public navCtrl: NavController, public navParams: NavParams , public alertCtrl: AlertController,
  private usereAuth : UserAuthProvider , private firebaseProvider:FirebaseProvider , private helper:HelpersProvider) {
   
  

    this.usereAuth.getDriverName().subscribe(item=>{
      this.trip.DriverName = item;
    });

    this.usereAuth.getPhoneNumber().subscribe(item=>{
      this.trip.DriverPhoneNumber = item;
    })

   this.trip.Driverkey = this.usereAuth.currentUserId();

   this.citiesName$ = this.firebaseProvider.getCities().snapshotChanges()
   .map(changes=>{
    return changes.map( c=>({
      key: c.payload.key, 
      ... c.payload.val(),
    }));
   })
  
  }

 

  AddTrip(trip: Trip)
  {

    console.log(trip);
    /*
  
    let confirm = this.alertCtrl.create({
      title: 'هل انت متاكد من اضافة الرحله ؟',
      buttons: [
        {
          text: 'اضافة',
          handler: () => {
            if(trip.Departure_City == null || trip.Arrival_city == null || trip.Date == null|| trip.Time== null || trip.PassengersNumber==null || trip.TripPrice==null)
            {
              let mess = "الرجاء اختيار المعلومات كاملة";
              this.helper.getErrorMessage(mess);
            }
            else{
              this.firebaseProvider.GetDriverAccount(this.trip.Driverkey).subscribe(number=>{
                console.log(number);
                  if(number == 0)
                  {

                    this.firebaseProvider.GetTripsNumber(this.trip.Driverkey).subscribe(tripNumber=>{
  
                      if (tripNumber > 0)
                      {
                        let mess = "عفوا ، لن تستطيع اكمل تسجيل الرحلة ، يجب عليك  اغلاق الرحلة السابقه";
                        this.helper.getErrorMessage(mess);

                      }

                      else if (tripNumber == 0 )
                      {

                        trip.tripRef = trip.Departure_City+"_" +trip.Arrival_city +"_"+ trip.Date;
                        trip.tripDriverRef = this.trip.Driverkey + trip.tripRef +"-"+ trip.Time;
                        trip.tripState = "open";
                        this.firebaseProvider.checkUserAddTrip(trip).subscribe(message=>{
                        this.helper.getErrorMessage(message);
                  })

                        
                      }

                  })
                }
                else if (number > 0)
                {
                  let mess = "عفوا ، لن تستطيع اكمل تسجيل الرحلة ، يجب عليك دفع المستحقات";
                  this.helper.getErrorMessage(mess);
                }
              })

            }
           
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

    */
  }



   


  



}
