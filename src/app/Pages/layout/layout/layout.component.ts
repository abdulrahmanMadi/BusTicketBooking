import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/commonModels';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  isLoggedIn = false;
  currentUser: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.checkAuthentication();
  }
  
  checkAuthentication(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.currentUser = this.authService.getCurrentUser();
      console.log('Current User:', this.currentUser); // Debugging
    }
  }
  
  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.currentUser = null;
  }
}
