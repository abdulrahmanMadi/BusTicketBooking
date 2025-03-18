import { Routes } from '@angular/router';
import { SearchComponent } from './Pages/search/search.component';
import { BookingComponent } from './Pages/booking/booking.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { HomeComponent } from './Pages/home/home.component';
import { LayoutComponent } from './Pages/layout/layout/layout.component';

export const routes: Routes = [
  { path: '', component: LayoutComponent ,children:[
    { path: '', component: HomeComponent },  // Home page for all users (authenticated or not)
    { path: 'Home', component: HomeComponent }, 
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
  //   { path: 'search', component: SearchComponent, canActivate: [AuthGuard] }, 
  //   { path: 'booking/:id', component: BookingComponent, canActivate: [AuthGuard] },
   ]},

 
];
