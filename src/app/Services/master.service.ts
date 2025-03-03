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



searchBusLocations(
  from: number,
  to: number,
  travelDate: string
): Observable<any[]> {
  return this.http
    .get<any>(`${this.ApiUrl}BusBooking/searchBus?from=${from}&to=${to}&date=${travelDate}`)
    .pipe(map((response) => response.data));
}

}
