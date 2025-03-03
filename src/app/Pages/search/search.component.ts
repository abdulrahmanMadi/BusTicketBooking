import { Component, inject ,OnInit} from '@angular/core';
import { MasterService } from '../../Services/master.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
  travledata:''
};
ngOnInit() {
this.getAllLocations();

}
getAllLocations() {
  this.Locations$ = this.masterService.getLocation();
}
onSearch() {
  if (!this.searchObj.fromLocation || !this.searchObj.tolocation || !this.searchObj.travledata) {
    alert('Please select valid search options.');
    return;
  }

  this.masterService
    .searchBusLocations(
      this.searchObj.fromLocation,
      this.searchObj.tolocation,
      this.searchObj.travledata
    )
    .subscribe({
      next: (data) => {
        this.BusList = data;
      },
      error: (err) => {
        console.error('Search failed:', err);
      }
    });
}
}


