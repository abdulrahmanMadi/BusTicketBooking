import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    isLoggedIn: boolean = false;
    userName: string = '';
  
    constructor(private authService: AuthService, private router: Router) {}
  
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
  
    logout(): void {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }