import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriverTripsDetailsPage } from './driver-trips-details';

@NgModule({
  declarations: [
    DriverTripsDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(DriverTripsDetailsPage),
  ],
})
export class DriverTripsDetailsPageModule {}
