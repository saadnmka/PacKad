import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {User} from '../../model/user.model';
import { AngularFireDatabase , AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
import {HelpersProvider} from '../../providers/firebase/helpers';
import {WelcomePage} from '../../pages/welcome/welcome';


/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserAuthProvider {

  user= {} as User
  AuthenticatedUser: any  ; 
  profileData : Observable<any>
 resutl ;
 Email:Observable<any>


  constructor( private userAuth:AngularFireAuth , private db : AngularFireDatabase, private helper:HelpersProvider ) {
    this.userAuth.authState.subscribe(data =>{
          if(data)
          {
            this.AuthenticatedUser = data.uid;
          }
          
    })  
  }


  /*
  Sing in the user and Log in with creating profile for this new user 

  */
 async SignIN(user: User )
  {

       let credential = firebase.auth.EmailAuthProvider.credential(user.Email, user.Password);  
            firebase.auth().currentUser.linkWithCredential(credential).then(()=>{
             this.userAuth.auth.signInWithEmailAndPassword(user.Email , user.Password)
              .then(authUser=>{
                this.db.object(`Userprofile/${authUser.uid}`).set(user)
                
              });   
            }).catch(error=>{
             let mess = "عفوا تم تسجيل هاذا لرقم مسبقا";
             this.helper.getErrorMessage(mess);
            })     

  }
  
 async LogIn(user: User)
  { 
    return  await this.userAuth.auth.signInWithEmailAndPassword(user.Email , user.Password)
  
  }


    currentUserId() {
    return  this.AuthenticatedUser;
  }


/*
   reutrn User profile

*/

   userProfile()
  {
     
     return this.db.object(`Userprofile/${this.AuthenticatedUser}`);
  }

  

  getDriverName()
  {
     
     return this.db.object(`Userprofile/${this.AuthenticatedUser}/Name`).valueChanges();
     
  }

  getPhoneNumber()
  {
      return this.db.object(`Userprofile/${this.AuthenticatedUser}/PhoneNumber`).valueChanges();
  }

  getRoleType(): Observable<string>
  {
    return Observable.create(observer =>{
      this.db.object(`Userprofile/${this.AuthenticatedUser}/role`).valueChanges().subscribe(result=>{
        observer.next(result)
        observer.complete();
      })
    })
      

  }

  SinInWithPhone(phoneNumberString, appVerifier)
  {
    

    return firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier);
  }


  checkIfPhoneExist(PhoneNumber:any): Observable<string>
  {
    return Observable.create(observer =>{
      return this.db.list('Userprofile' , ref=>ref.orderByChild('PhoneNumber')
           .equalTo(PhoneNumber)).valueChanges().subscribe(result=>{
             if(result.length == 0)
             {
              observer.next('No');
             }
             else{
               observer.next('yes')
             }
             observer.complete();
           });
    });
  }


  UpdateUserProfile(user:User)
  {
    let ItemListRef = this.db.list <User>('Userprofile')
    return ItemListRef.update(user.Key , user);
   
  }

 
  getDriverKey(key)
  {
     
     return this.db.object(`Userprofile/${key}/Name`).valueChanges();  
  }



 async logOut()
 {
    return await this.userAuth.auth.signOut();
        
 }

  resetPassword(email: string) {
        var auth = firebase.auth();
        return auth.sendPasswordResetEmail(email);
}
    


  UserUpdateEmail( UserEmail)
  {
    
    return  firebase.auth().currentUser.updateEmail(UserEmail);
  }


  UpdatePassowrd(UserPassowrd)
  {

    return  firebase.auth().currentUser.updatePassword(UserPassowrd);

  }







}











