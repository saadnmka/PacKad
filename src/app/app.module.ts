import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import {LoginPage} from '../pages/login/login';
import {ProfilePage} from '../pages/profile/profile';
import {HistoryPage} from '../pages/history/history';
import {DriveRegPage} from '../pages/drive-reg/drive-reg';
import {BookingPage} from '../pages/booking/booking';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {RegistrationPage} from '../pages/registration/registration';
import {WelcomePage} from '../pages/welcome/welcome';
import {FIREBASE_CONFIG} from './firebase-credentials';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import { FirebaseProvider } from '../providers/firebase/firebase';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {UserAuthProvider} from '../providers/firebase/userAuth';
import {AddTripPage} from '../pages/add-trip/add-trip';
import {TripPage} from '../pages/trip/trip';
import {TripDetailsPage} from '../pages/trip-details/trip-details';
import {NextRegistrationPage} from '../pages/next-registration/next-registration';
import {AddConformationCodePage} from '../pages/add-conformation-code/add-conformation-code';
import { HelpersProvider } from '../providers/firebase/helpers';
import {AddBokkingInfoPage} from '../pages/add-bokking-info/add-bokking-info';
import {HistoryDetailsPage} from '../pages/history-details/history-details';
import {DrivRegCompletePage} from '../pages/driv-reg-complete/driv-reg-complete';
import {ContactUsPage} from '../pages/contact-us/contact-us';
import {DriverAccountPage} from '../pages/driver-account/driver-account'; 
import {DriverTripsDetailsPage} from '../pages/driver-trips-details/driver-trips-details';
import {PaymentPage} from '../pages/payment/payment';
import {ResetPasswordPage} from '../pages/reset-password/reset-password';
import {CarDetailsPage} from '../pages/car-details/car-details';




@NgModule({
  declarations: [
    MyApp,
    ProfilePage,
    HistoryPage,
    DriveRegPage,
    BookingPage,
    LoginPage,
    RegistrationPage,
    WelcomePage,
    AddTripPage,
    TripPage,
    TripDetailsPage,
    NextRegistrationPage,
    AddConformationCodePage,
    AddBokkingInfoPage,
    HistoryDetailsPage,
    DrivRegCompletePage,
    ContactUsPage,
    DriverAccountPage,
    DriverTripsDetailsPage,
    PaymentPage,
    ResetPasswordPage,
    CarDetailsPage
    
    


  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp ,{
      backButtonText: 'رجوع',
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition'
    },
  ),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

 
 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilePage,
    HistoryPage,
    DriveRegPage,
    BookingPage,
    LoginPage,
    RegistrationPage,
    WelcomePage,
    AddTripPage,
    TripPage,
    TripDetailsPage,
    NextRegistrationPage,
    AddConformationCodePage,
    AddBokkingInfoPage,
    HistoryDetailsPage,
    DrivRegCompletePage,
    ContactUsPage,
    DriverAccountPage,
    DriverTripsDetailsPage,
    PaymentPage,
    ResetPasswordPage,
    CarDetailsPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    UserAuthProvider,
    HelpersProvider,
    
  ]
})
export class AppModule {}
