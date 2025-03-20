import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  ApiUrl: string = 'https://localhost:7110/api/';

  constructor(private http: HttpClient) {}

  getLocation(): Observable<any[]> {
    return this.http.get<any>(this.ApiUrl + 'Location/GetBusLocations').pipe(
      map(response => response.data)
    );
  }
  getLocationName(): Observable<Map<number, string>> {
    return this.http.get<any>(this.ApiUrl + 'Location/GetBusLocations').pipe(
      map(response => {
        const locationMap = new Map<number, string>();
        response.data.forEach((location: { locationId: number; locationName: string }) => {
          locationMap.set(location.locationId, location.locationName);
        });
        return locationMap;
      })
    );
  }
  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.ApiUrl}User/GetUserById/${userId}`);
  }
  getBookingHistory(customerId: number): Observable<any> {
    return this.http.get<any>(`${this.ApiUrl}BusBooking/GetBusBookingsByCustomerId/${customerId}`);
  }
  searchBusLocations(from: number, to: number, travelDate: string): Observable<any[]> {
    return this.http
      .get<any>(`${this.ApiUrl}BusBooking/searchBus?from=${from}&to=${to}&date=${travelDate}`)
      .pipe(map(response => response.data));
  }

  getScheduleById(id: number): Observable<any> {
    return this.http
      .get<any>(`${this.ApiUrl}BusSchedule/GetBusScheduleById/${id}`)
      .pipe(map(response => response.data));
  }

  getBookedSeats(id: number): Observable<any[]> {
    return this.http
      .get<any>(`${this.ApiUrl}BusBooking/getBookedSeats/${id}`)
      .pipe(map(response => response.data));
  }

  onRegisterUser(obj: any): Observable<any> {
    return this.http.post<any>(this.ApiUrl + 'User/AddNewUser', obj);
  }

  onBooking(obj: any): Observable<any> {
    return this.http.post<any>(this.ApiUrl + 'BusBooking/PostBusBooking', obj);
  }

  // Add this method to fetch bus schedules
  getBusSchedules(): Observable<any[]> {
    return this.http
      .get<any>(`${this.ApiUrl}BusBooking/GetBusSchedules`)
      .pipe(map(response => response.data));
  }
}