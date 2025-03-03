import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7110/api/Authentication'; // Replace with your API URL
  private jwtHelper = new JwtHelperService();
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID
  ) {}

  // Check if user is logged in
  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) { // Check if running in the browser
      const token = localStorage.getItem('token');
      return !!token && !this.jwtHelper.isTokenExpired(token);
    }
    return false; // Return false if not in the browser
  }

  // Save tokens to local storage
  saveTokens(token: string, refreshToken: string): void {
    if (isPlatformBrowser(this.platformId)) { // Check if running in the browser
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      this.loggedIn.next(true);
    }
  }

  // Get current user
  getCurrentUser(): any {
    if (isPlatformBrowser(this.platformId)) { // Check if running in the browser
      const token = localStorage.getItem('token');
      if (token) {
        return this.jwtHelper.decodeToken(token);
      }
    }
    return null;
  }

  // Logout
  logout(): void {
    if (isPlatformBrowser(this.platformId)) { // Check if running in the browser
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      this.loggedIn.next(false);
      this.router.navigate(['/login']);
    }
  }

  // Observable for login status
  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  // Login
  login(loginRequest: { userName: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginRequest);
  }

  // Register
  register(registerRequest: {
    userName: string;
    emailId: string;
    fullName: string;
    roleId: number;
    password: string;
    contactNo?: string; // Optional for vendors
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registerRequest);
  }

  // Refresh Token
  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/refresh-token`, { refreshToken });
  }
}