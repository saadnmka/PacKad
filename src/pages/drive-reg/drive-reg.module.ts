import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriveRegPage } from './drive-reg';

@NgModule({
  declarations: [
    DriveRegPage,
  ],
  imports: [
    IonicPageModule.forChild(DriveRegPage),
  ],
})
export class DriveRegPageModule {}
