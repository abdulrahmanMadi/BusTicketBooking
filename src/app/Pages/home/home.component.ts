import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { register } from 'module';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'], // fix: should be "styleUrls", not "styleUrl"
})
export class HomeComponent implements OnInit {

    isLoggedIn: boolean = false;
    userName: string = '';
  
    constructor(private authService: AuthService, private router: Router) {}
  
    ngOnInit(): void {
      // Subscribe to login status changes
      this.authService.isLoggedIn$.subscribe((loggedIn) => {
        this.isLoggedIn = loggedIn;
        if (loggedIn) {
          const user = this.authService.getCurrentUser();
          this.userName = user?.userName || '';
        }
      });
  
      // Initial check
      this.isLoggedIn = this.authService.isLoggedIn();
      if (this.isLoggedIn) {
        const user = this.authService.getCurrentUser();
        this.userName = user?.userName || '';
      }
    }
  
    logout(): void {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }