import { Component } from '@angular/core';
import { MasterService } from '../../Services/master.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [AsyncPipe, FormsModule, CommonModule, RouterLink],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  scheduleId: number = 0;
  scheduleData: any;

  seatArray: number[] = [];
  bookedSeatsArray: number[] = [];
  userSelectedSeatArray: any[] = [];

  constructor(private activatedRoute: ActivatedRoute, private masterSrv: MasterService) {
    this.activatedRoute.params.subscribe((res: any) => {
      this.scheduleId = res.id;
      this.getScehduleDetaislById();
      this.getBookedSeats();
    });
  }

  getScehduleDetaislById() {
    this.masterSrv.getScheduleById(this.scheduleId).subscribe((res: any) => {
      this.scheduleData = res;
      this.seatArray = []; // Reset to avoid duplicate seats on refresh
      for (let index = 1; index <= this.scheduleData.totalSeats; index++) {
        this.seatArray.push(index);
      }
      this.getBookedSeats(); // Don't forget to fetch booked seats after loading schedule!
    });
  }
  

  getBookedSeats() {
    this.masterSrv.getBookedSeats(this.scheduleId).subscribe((res: any[]) => {
      this.bookedSeatsArray = res;
    });
  }
  

  checkIfSeatBooked(seatNo: number): boolean {
    return this.bookedSeatsArray.includes(seatNo);
  }

  selectSeat(seatNo: number) {
    if (this.checkIfSeatBooked(seatNo) || this.checkIsSeatSelected(seatNo)) {
      return; // Prevent selecting already booked or selected seats
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
    return this.userSelectedSeatArray.some(m => m.seatNo == seatNo);
  }
  

  bookNow() {
    if (this.userSelectedSeatArray.length === 0) {
      alert('Please select seats and enter passenger details.');
      return;
    }

    const loggedUserData = localStorage.getItem('redBusUser');
    if (loggedUserData) {
      const loggData = JSON.parse(loggedUserData);
      const bookingPayload = {
        bookingId: 0,
        custId: loggData.userId,
        bookingDate: new Date(),
        scheduleId: this.scheduleId,
        BusBookingPassengers: this.userSelectedSeatArray
      };
      this.masterSrv.onBooking(bookingPayload).subscribe(
        () => alert('Booking Success!'),
        () => alert('Booking failed, please try again.')
      );
    } else {
      alert('Please log in to book.');
    }
  }
}
