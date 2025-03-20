import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { MasterService } from '../../../Services/master.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  currentUser: any;
  bookedBuses: any[] = [];
  isEditMode: boolean = false;

  constructor(private authService: AuthService, private masterService: MasterService) {}

  ngOnInit(): void {
    // this.loadUserProfile();
    // this.loadBookedBuses();
  }

//   loadUserProfile(): void {
//     this.currentUser = this.authService.getCurrentUser();
//   }

//   loadBookedBuses(): void {
//     if (this.currentUser) {
//       this.masterService.getBookedBusesByUser(this.currentUser.userId).subscribe({
//         next: (data) => (this.bookedBuses = data),
//         error: (err) => console.error('Failed to load booked buses:', err)
//       });
//     }
//   }

//   toggleEditMode(): void {
//     this.isEditMode = !this.isEditMode;
//   }

//   updateProfile(): void {
//     if (this.currentUser) {
//       this.authService.updateUser(this.currentUser.userId, this.currentUser).subscribe({
//         next: () => {
//           alert('Profile updated successfully!');
//           this.toggleEditMode();
//         },
//         error: (err) => console.error('Failed to update profile:', err)
//       });
//     }
//   }
 }