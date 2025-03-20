import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LayoutComponent } from './Pages/layout/layout/layout.component';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { SearchComponent } from './Pages/search/search.component';
import { BookingComponent } from './Pages/booking/booking.component';
import { UserProfileComponent } from './Pages/user-profile/user-profile/user-profile.component';
import { BusScheduleComponent } from './Pages/bus-schedule/bus-schedule/bus-schedule.component';
import { BookingHistoryComponent } from './Pages/booking-history/booking-history/booking-history.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' }, // Ensures proper redirection
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'search', component: SearchComponent, canActivate: [AuthGuard] }, 
      { path: 'booking/:id', component: BookingComponent, canActivate: [AuthGuard] },
      { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
      { path: 'bus-schedule', component: BusScheduleComponent, canActivate: [AuthGuard] },
      { path: 'booking-history', component: BookingHistoryComponent },
    
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirect unknown paths to home
];
