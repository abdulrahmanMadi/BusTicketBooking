import { Routes } from '@angular/router';
import { SearchComponent } from './Pages/search/search.component';
import { BookingComponent } from './Pages/booking/booking.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { HomeComponent } from './Pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Home page for non-authenticated users
  { path: 'Home', component: HomeComponent }, // Home page for non-authenticated users

  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] }, // Search page for authenticated users
  { path: 'booking/:id', component: BookingComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }, // Redirect to home for unknown routes
];
