import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   // isLoggedIn: boolean = false;
  
    constructor( private router: Router) {}
  
    ngOnInit(): void {
      // Subscribe to login status changes
      // this.authService.isLoggedIn$.subscribe((loggedIn) => {
      //   this.isLoggedIn = loggedIn;
      //   if (loggedIn) {
      //     const user = this.authService.getCurrentUser();
      //     this.userName = user?.userName || '';
      //   }
      // });
  
      // // Initial check
      // this.isLoggedIn = this.authService.isLoggedIn();
      // if (this.isLoggedIn) {
      //   const user = this.authService.getCurrentUser();
      //   this.userName = user?.userName || '';
      // }
    }
  
  
  }