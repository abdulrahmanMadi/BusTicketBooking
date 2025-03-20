import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MasterService } from '../../../Services/master.service';
import { StorageService } from '../../../Services/storage.service';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Booking, Schedule } from '../../../models/commonModels';

@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss']
})
export class BookingHistoryComponent implements OnInit {
  bookingHistory: Booking[] = [];
  loading: boolean = true;
  locationMap = new Map<number, string>();

  constructor(
    private masterSrv: MasterService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.loadBookingHistory();
  }

  loadBookingHistory(): void {
    const loggedUserData = this.storageService.getItem('user');
    if (!loggedUserData) {
      Swal.fire({
        icon: 'info',
        title: 'Login Required',
        text: 'Please log in to view your booking history.'
      });
      this.loading = false;
      return;
    }

    let loggData;
    try {
      loggData = JSON.parse(loggedUserData);
    } catch (error) {
      console.error('Error parsing user data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Invalid User Data',
        text: 'Please log in again.'
      });
      this.loading = false;
      return;
    }

    if (!loggData || !loggData.userId) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid User Data',
        text: 'User ID is missing. Please log in again.'
      });
      this.loading = false;
      return;
    }

    // Fetch Locations and Bookings in Parallel
    forkJoin({
      locations: this.masterSrv.getLocationName(),
      bookings: this.masterSrv.getBookingHistory(loggData.userId)
    }).subscribe({
      next: ({ locations, bookings }) => {
        this.locationMap = locations;

        if (bookings.result) {
          const bookingData: Booking[] = bookings.data;

          // Fetch Schedule Details for Each Booking
          const scheduleRequests: Observable<Booking>[] = bookingData.map((booking) =>
            this.masterSrv.getScheduleById(booking.scheduleId).pipe(
              map((schedule: Schedule) => ({
                ...booking,
                schedule: {
                  ...schedule,
                  fromLocationName: locations.get(schedule.fromLocationId) || 'Unknown',
                  toLocationName: locations.get(schedule.toLocationId) || 'Unknown'
                }
              }))
            )
          );

          forkJoin(scheduleRequests).subscribe({
            next: (detailedBookings: Booking[]) => {
              this.bookingHistory = detailedBookings;
              this.loading = false;
            },
            error: () => {
              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to load schedule details.'
              });
              this.loading = false;
            }
          });
        } else {
          this.bookingHistory = [];
          this.loading = false;
        }
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to load booking history or locations. Please try again later.'
        });
        this.loading = false;
      }
    });
  }
}
