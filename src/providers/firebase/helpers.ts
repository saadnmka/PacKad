import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {User} from '../../model/user.model';
import { AngularFireDatabase , AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';



/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HelpersProvider {

    constructor( private userAuth:AngularFireAuth , private db : AngularFireDatabase , private alert: AlertController ) {
        
    }

  
      getErrorMessage(message)
      {
        let alert = this.alert.create({
          title: ' دوروب',
          subTitle: message ,
          buttons: ['موافق']
        });
        alert.present();
      }


      getpercentage(passengerNumber:number , price:number):number
      {
        return passengerNumber * price * 0.1 ; 
      }

      AddToDriverAcount(existingAmount: number , newAmount: number):number
      {
        return existingAmount + newAmount ; 

      }

      CutFormDriverAcount(existingAmount: number , newAmount: number):number
      {
        return existingAmount - newAmount ; 

      }

      AddPassengers(existPassengers: number ,newPassengers: number):number
      {
        return existPassengers + newPassengers * 1 ; 

      }

      CutPassengers(existPassengers: number ,newPassengers: number):number
      {
        return existPassengers - newPassengers ; 
      }
}



