import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
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
