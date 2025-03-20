import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { MasterService } from '../../../Services/master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bus-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './bus-schedule.component.html',
  styleUrls: ['./bus-schedule.component.scss']
})
export class BusScheduleComponent implements OnInit {
  busSchedules: any[] = [];
  Locations$: Observable<any[]> = new Observable<any[]>();
  filter = {
    fromLocation: '',
    toLocation: '',
    date: ''
  };

  constructor(public masterService: MasterService) {}

  ngOnInit(): void {
    this.getAllLocations();
    this.loadBusSchedules();
  }

  getAllLocations(): void {
    this.Locations$ = this.masterService.getLocation();
  }

  loadBusSchedules(): void {
    this.masterService.getBusSchedules().subscribe({
      next: (data) => (this.busSchedules = data),
      error: (err) => {
        console.error('Failed to load bus schedules:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to load bus schedules. Please try again later.'
        });
      }
    });
  }

  applyFilters(): void {
    if (!this.filter.fromLocation || !this.filter.toLocation || !this.filter.date) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please select valid search options before proceeding.'
      });
      return;
    }

    const from = Number(this.filter.fromLocation); // Convert to number
    const to = Number(this.filter.toLocation); // Convert to number
    const date = this.filter.date;

    this.masterService
      .searchBusLocations(from, to, date)
      .subscribe({
        next: (data) => {
          this.busSchedules = data;
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Bus schedules updated successfully.'
          });
        },
        error: (err) => {
          console.error('Failed to filter bus schedules:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to filter bus schedules. Please try again later.'
          });
        }
      });
  }
}
