import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriverAccountPage } from './driver-account';

@NgModule({
  declarations: [
    DriverAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(DriverAccountPage),
  ],
})
export class DriverAccountPageModule {}
