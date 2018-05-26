import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ProfilePage} from '../pages/profile/profile';
import {HistoryPage} from '../pages/history/history';
import {DriveRegPage} from '../pages/drive-reg/drive-reg';
import {BookingPage} from '../pages/booking/booking';
import {LoginPage} from '../pages/login/login';
import {WelcomePage} from '../pages/welcome/welcome';
import {User} from '../model/user.model';
import {AngularFireDatabase ,AngularFireObject} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import {UserAuthProvider} from '../providers/firebase/userAuth';
import {AddTripPage} from '../pages/add-trip/add-trip';
import {DriverAccountPage} from '../pages/driver-account/driver-account'; 
import {ContactUsPage} from '../pages/contact-us/contact-us';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  Name : any ; 
  Email: any ;  
  saad: any 
  profileData: Observable<any>
  rootPage: any = LoginPage;
  user = {} as User ;
  pages: Array<{title: string, component: any , icon: any }>;
  pagesDriver: Array<{title: string, component: any , icon: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen , 
  private userAuth: UserAuthProvider , private afauth : AngularFireAuth , private db : AngularFireDatabase ) {
    this.initializeApp();

  
 
    
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'الرئيسية', component: WelcomePage , icon:'home' }, 
      { title: 'رحلاتي', component: HistoryPage , icon:'train'  },
      { title: 'تسجيل سواق', component: DriveRegPage , icon: 'train' },
      { title: 'ملفي الشخصي', component: ProfilePage , icon: 'person' },
      { title: 'اتصل بنا ', component: ContactUsPage , icon: 'person' },
      { title: 'خروج', component: null, icon: 'log-out' },
     
    ];


    this.pagesDriver = [
      { title: 'الرئيسية', component: WelcomePage , icon:'home' },
      { title: 'حجز', component: BookingPage , icon:'card' },
      { title: 'رحلاتي', component: HistoryPage , icon:'train'  },
      { title: 'ملفي الشخصي', component: ProfilePage , icon: 'person' },
      { title: 'اضافة رحله جديده', component:  AddTripPage, icon: 'car' },
      { title: 'صفحة الكدادين ', component: DriverAccountPage , icon: 'cash' },
      { title: 'اتصل بنا ', component: ContactUsPage , icon: 'person' },
      { title: 'خروج', component:  null, icon: 'log-out' },
    
    ]; 

   
    this.afauth.authState.subscribe(data =>{
      if(data)
      {
        this.profileData  = this.db.object(`Userprofile/${data.uid}`).valueChanges();

      }
     

   })
 

  }



  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.component)
    {
      this.nav.setRoot(page.component);
    }
    else
    {
      this.userAuth.logOut().then(()=>{
        this.nav.setRoot(LoginPage);
      })
    }
    
  }
}
