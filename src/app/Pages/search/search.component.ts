import { Component, inject ,OnInit} from '@angular/core';
import { MasterService } from '../../Services/master.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AsyncPipe, FormsModule,CommonModule,RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
masterService = inject(MasterService);
Locations$ :Observable<any[]> = new Observable<any[]>;
BusList:any[]=[];
searchObj:any = {
  fromLocation: '',
  tolocation: '',
  travelDate: '' }

ngOnInit() {
this.getAllLocations();

}
getAllLocations() {
  this.Locations$ = this.masterService.getLocation();
}
onSearch() {
  if (!this.searchObj.fromLocation || !this.searchObj.tolocation || !this.searchObj.travelDate) {
    Swal.fire({
      icon: 'warning',
      title: 'Invalid Search',
      text: 'Please select valid search options before proceeding.'
    });    return;
  }

  this.masterService
    .searchBusLocations(
      this.searchObj.fromLocation,
      this.searchObj.tolocation,
      this.searchObj.travelDate
    )
    .subscribe({
      next: (data) => {
        this.BusList = data;
        if (this.BusList.length === 0) {
          Swal.fire({
            icon: 'info',
            title: 'No Buses Found',
            text: 'No available buses for the selected route and date.'
          });
        }
      },
      error: (err) => {
        console.error('Search failed:', err);
        Swal.fire({
          icon: 'error',
          title: 'Search Failed',
          text: 'Something went wrong. Please try again later.'
        });
      }
    });
}
}


