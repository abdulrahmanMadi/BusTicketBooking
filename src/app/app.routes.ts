import { Routes } from '@angular/router';
import { SearchComponent } from './Pages/search/search.component';
import { BookingComponent } from './Pages/booking/booking.component';

export const routes: Routes = [
    {
        path: 'search',
        redirectTo:'search',
        pathMatch: 'full'
    },
    {
        path: 'search',
       component: SearchComponent
    }
    ,
    {
        path: 'booking',
       component: BookingComponent
    }
];
