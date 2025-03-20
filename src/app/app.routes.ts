import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LayoutComponent } from './Pages/layout/layout/layout.component';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { SearchComponent } from './Pages/search/search.component';
import { BookingComponent } from './Pages/booking/booking.component';

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
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirect unknown paths to home
];
