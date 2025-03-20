import { Component } from '@angular/core';
import { MasterService } from '../../Services/master.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { StorageService } from '../../Services/storage.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [AsyncPipe, FormsModule, CommonModule, RouterLink],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {
  scheduleId: number = 0;
  scheduleData: any;
  seatArray: number[] = [];
  bookedSeatsArray: number[] = [];
  userSelectedSeatArray: any[] = [];
  seatRows: number[][] = []; 

  constructor(private activatedRoute: ActivatedRoute, private masterSrv: MasterService , private storageService: StorageService // Inject StorageService
  ) {
    this.activatedRoute.params.subscribe((params: any) => {
      this.scheduleId = params.id;
      this.getScheduleDetailsById();
    });
  }
  ngOnInit() {
    this.getScheduleDetailsById();
  }
  
  getScheduleDetailsById() {
    this.masterSrv.getScheduleById(this.scheduleId).subscribe({
      next: (res: any) => {
        this.scheduleData = res;
        this.createSeatLayout(this.scheduleData.totalSeats);
        this.getBookedSeats();
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to load schedule details. Please try again later.'
        });
      }
    });
  }
  
  createSeatLayout(totalSeats: number) {
    const seatsPerRow = 4; // 2x2 layout
    let seatNo = 1;
    this.seatRows = [];
  
    while (seatNo <= totalSeats) {
      let row = [];
      for (let i = 0; i < seatsPerRow && seatNo <= totalSeats; i++) {
        row.push(seatNo++);
      }
      this.seatRows.push(row);
    }
  }
  

  getBookedSeats() {
    this.masterSrv.getBookedSeats(this.scheduleId).subscribe({
      next: (res: any[]) => {
        this.bookedSeatsArray = res;
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to load booked seats. Please refresh and try again.'
        });
      }
    });
  }

  checkIfSeatBooked(seatNo: number): boolean {
    return this.bookedSeatsArray.includes(seatNo);
  }

  selectSeat(seatNo: number) {
    if (this.checkIfSeatBooked(seatNo) || this.checkIsSeatSelected(seatNo)) {
      return;
    }
    this.userSelectedSeatArray.push({
      passengerId: 0,
      bookingId: 0,
      passengerName: '',
      age: 0,
      gender: '',
      seatNo: seatNo
    });
  }

  checkIsSeatSelected(seatNo: number): boolean {
    return this.userSelectedSeatArray.some(seat => seat.seatNo === seatNo);
  }

  bookNow() {
    if (this.userSelectedSeatArray.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No Seats Selected',
        text: 'Please select seats and enter passenger details before booking.'
      });
      return;
    }

    const loggedUserData = this.storageService.getItem('user');
    if (!loggedUserData) {
      Swal.fire({
        icon: 'info',
        title: 'Login Required',
        text: 'Please log in to book your tickets.'
      });
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
      return;
    }

     // Ensure the user data contains the required properties
     if (!loggData || !loggData.userId) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid User Data',
        text: 'User ID is missing. Please log in again.'
      });
      return;
    }

      const bookingPayload = {
      bookingId: 0,
      custId: loggData.userId,
      bookingDate: new Date(),
      scheduleId: this.scheduleId,
      BusBookingPassengers: this.userSelectedSeatArray
    };
    

    this.masterSrv.onBooking(bookingPayload).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Booking Successful!',
          text: 'Your tickets have been booked successfully.'
        }).then(() => {
          this.userSelectedSeatArray = []; // Reset selected seats
          this.getBookedSeats(); // Refresh booked seats
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Booking Failed!',
          text: 'Booking failed, please try again later.'
        });
      }
    });
  }
}
