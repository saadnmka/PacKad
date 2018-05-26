
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {User} from '../../model/user.model';
import { AngularFireDatabase , AngularFireObject , AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs';
import {Trip} from '../../model/Trip.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import {HelpersProvider} from '../firebase/helpers';
import {AddTripPage} from '../../pages/add-trip/add-trip';
import {Passengers} from '../../model/passengers.model';
import {Driver} from '../../model/driver.model';
import {Claim} from '../../model/claim.model';
import {Payment} from '../../model/payment.model';


/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  AuthenticatedUser: any  ; 
  size$: BehaviorSubject<string|null>;
  TripList$: Observable<any>;
 claim = {} as Claim ; 



      constructor( private userAuth:AngularFireAuth , private db : AngularFireDatabase,
      
       private helper: HelpersProvider) {
        
      }




/*
  Functions that are used for Trips .

*/
      checkUserAddTrip(trip:Trip ):Observable<string>
      {

        return Observable.create(observer =>{
          this.tripDriverList(trip).subscribe(result=>{
            if(result.length == 0)
            {
              this.AddNewTrip(trip).then(action=>{
                this.UpdateDriverTripsNumber(trip.Driverkey , 1);
              })
              observer.next('تم اضافة الرحلة');
              
            }
            else{
              observer.next('عفوا الرحلة مضافة مسبقا');
            }
            observer.complete();
          });
        });

      }
   
      tripDriverList(trip:Trip)
      {
        return this.db.list('Trips' , ref=>ref.orderByChild('tripDriverRef')
           .equalTo(trip.tripDriverRef)).valueChanges();
      }

      AddNewTrip(trip: Trip)
      {

        return this.db.list('Trips').push(trip);
      }
   
      getAllTrips()
      {
           return this.db.list('Trips');
      }


      getOneTrip(trip: Trip)
      {
        
         return this.db.list('Trips' , ref=>
            ref.orderByChild('tripRef').equalTo(trip.tripRef)
           );

      } 


      getDriverTrips(driver)
      {
        
         return this.db.list('Trips' , ref=>
            ref.orderByChild('Driverkey').equalTo(driver)
           );

      }

     DriverCloseTrip(TripKey)
     {
      return this.db.object(`Trips/${TripKey}`).update({
        tripState: "close"

      })  
        
     }

     UpdateDriverTripsNumber( driverkey , Number:number)
     {
      return this.db.object(`Userprofile/${driverkey}`).update({
        Trips : Number
       })
     }

     GetTripsNumber(driverkey): Observable<number>
     {
      return Observable.create(observer =>{
        this.db.object(`Userprofile/${driverkey}/Trips`).valueChanges().subscribe(result=>{
          observer.next(result);
          observer.complete();
        });
      });
    }
       





/*
  These functions for dealing with  passengers (add- update)

*/
      addPassengers(passenger: Passengers , DriverKey , DriverAcount )
      {
        const mess = "تم حجز الرحلة بنجاح ، سوف يقوم الكداد بالاتصال بك قريبا";
        this.getPassengersNumber(passenger.TripKey).subscribe(num=>{
        let total = this.helper.CutPassengers(num , passenger.passengersNumber)
        this.updatePassengersNumber(total , passenger.TripKey).then(()=>{
        this.GetDriverAccount(DriverKey).subscribe(acount=>{
        let driverTotal =   this.helper.AddToDriverAcount(acount ,DriverAcount )
        this.updateDriverAcount(DriverKey ,driverTotal ).then(()=>{
          this.db.list(`Passengers`).push(passenger);
          this.helper.getErrorMessage(mess);
             })
           })


          })

       })
           
 
      }

      getPassengersNumber(TripNumber)
      {

        return Observable.create(observer =>{
          this.db.object(`Trips/${TripNumber}/PassengersNumber`).valueChanges().subscribe(result=>{
            observer.next(result);
            observer.complete();
          });
        });
      }
      updatePassengersNumber(number:number , TripNumber)
      {
        return this.db.object(`Trips/`+ TripNumber).update({
          PassengersNumber: number
        })
      }

      getPassengersList(Passenger)
      {
        return this.db.list('Passengers',  ref=>ref.orderByChild('PassengerKey')
        .equalTo(Passenger));
      }

      

      getTripForpassengers(passenger)
      {
        return this.db.list('Trips',ref=>ref.orderByKey().equalTo(passenger));
      }

      getPassengerInfoForOneTrip(Trip)
      {
        return this.db.list('Passengers',  ref=>ref.orderByChild('TripKey')
        .equalTo(Trip));
      }

      CancelPassenger(passenger: Passengers , DriverKey , DriverAcount )
      {

        const mess = "تم الغاء الرحلة"
        return this.getPassengersNumber(passenger.TripKey).subscribe(num=>{
        let total = this.helper.AddPassengers(num , passenger.passengersNumber)
        this.updatePassengersNumber(total , passenger.TripKey).then(()=>{
        this.GetDriverAccount(DriverKey).subscribe(acount=>{
        let driverTotal =   this.helper.CutFormDriverAcount(acount ,DriverAcount )
        this.updateDriverAcount(DriverKey ,driverTotal ).then(()=>{
        this.UpdatePassengerState(passenger , "cancelled").then(()=>{
        this.helper.getErrorMessage(mess)
        })  

        })
      
          
           })


          })

       })

      }

      UpdatePassengerState(passenger: Passengers , state)
      {
        return this.db.object(`Passengers/`+ passenger.key).update( {
          PassengerState: state
        })

      }

     GetPassengersRefrence(PassRef)
     {
      return this.db.list('Passengers',  ref=>ref.orderByChild('PassengerRef')
      .equalTo(PassRef));

     }

      

/*
        these functions for dealing with car information 
  
*/

      addUserAsDriver(driver: Driver)
      {
        return this.db.object(`Driver_Car/${driver.DriverKey}`).set(driver).then(()=>{
          return this.db.object(`Userprofile/${driver.DriverKey}`).update({
            role: "driver",
            account: 0 ,
            Trips : 0
          })
          
        })
      }

      getCarData(key)
      {
        return this.db.object(`Driver_Car/${key}`);
      }

      UpdateCarInfo(key , driver:Driver)
      {
        return this.db.object(`Driver_Car/${key}`).update(driver);
      }



      /*
        Deal With driver Account
  
      */


     GetDriverAccount(DriverKey):Observable<number>
     {

       return Observable.create(observer =>{
         this.db.object(`Userprofile/${DriverKey}/account`).valueChanges().subscribe(result=>{
           observer.next(result);
           observer.complete();
         });
       });
     }

     updateDriverAcount(DriverKey , acount)
     {
      return this.db.object(`Userprofile/${DriverKey}`).update({
        account: acount

   })
 

     }

    MakeitZero(DriverKey)
    {

      this.db.object(`Userprofile/${DriverKey}`).update({
        account: 0,
        Trips: 0

   })
      
    }
    
    getPassengerState(Ticket)
    {
      return this.db.object(`Passengers/${Ticket}/PassengerState`);
    }

    AddCalim(claim: Claim)
    {
      return this.db.list(`Claims/${claim.UserID}`).push(claim);
    }

    addCity(city:string)
    {
      this.db.list('City').push({
        city : city
      });
    }

    getCities()
    {
      return this.db.list('City');
    }

    addPayment(payment: Payment)
    {
      return this.db.list(`Payment/${payment.UserId}`).push(payment);
    }



}
