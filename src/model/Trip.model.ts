import { Time } from "@angular/common";

export interface Trip{
    key?:string ; 
    Driverkey:any;
    DriverName: any;
    DriverPhoneNumber : any;
    Departure_City: string;
    Arrival_city: string;
    Date: any ; 
    Time; 
    PassengersNumber: number; 
    TripPrice: any ; 
    tripRef: any ; 
    tripDriverRef: any 
    tripState: any ; 
}  