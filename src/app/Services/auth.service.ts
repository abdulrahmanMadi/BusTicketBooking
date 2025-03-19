import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isPlatformBrowser } from '@angular/common';
import { APIResponse, LoginRequest, RegisterRequest, User } from '../models/commonModels';
import { apiEndPoint } from '../core/constants/constans';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  private encryptionKey = '8ec7779d-26e9-4529-985d-0b4fecdb4b1d'; // Replace with a secure key

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Check if the token is a valid JWT
  isValidJwt(token: string | null): boolean {
    if (!token) return false;
    const parts = token.split('.');
    return parts.length === 3; // A valid JWT has 3 parts
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.getToken();
      return !!token && this.isValidJwt(token) && !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  // Save tokens to local storage
  saveTokens(token: string, refreshToken: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const encryptedToken = CryptoJS.AES.encrypt(token, this.encryptionKey).toString();
      const encryptedRefreshToken = CryptoJS.AES.encrypt(refreshToken, this.encryptionKey).toString();

      localStorage.setItem('token', encryptedToken);
      localStorage.setItem('refreshToken', encryptedRefreshToken);

      // Update login status
      this.loggedIn.next(true);
    }
  }

  // Get the decrypted token
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const encryptedToken = localStorage.getItem('token');
      if (!encryptedToken) return null;

      const bytes = CryptoJS.AES.decrypt(encryptedToken, this.encryptionKey);
      return bytes.toString(CryptoJS.enc.Utf8);
    }
    return null;
  }

  // Decode JWT Token
  getDecodedToken(): any {
    const token = this.getToken();
    if (!token || !this.isValidJwt(token)) return null;
    return this.jwtHelper.decodeToken(token);
  }

  // Get current user
  getCurrentUser(): any {
    return this.getDecodedToken();
  }

  // Logout
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
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
  login(payload: LoginRequest): Observable<APIResponse<User>> {
    return this.http.post<APIResponse<User>>(`${apiEndPoint.Auth.Login}`, payload);
  }

  // Register
  register(payload: RegisterRequest): Observable<APIResponse<User>> {
    return this.http.post<APIResponse<User>>(`${apiEndPoint.Auth.Register}`, payload);
  }
}