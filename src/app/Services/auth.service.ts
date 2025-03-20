import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { StorageService } from './storage.service';
import { APIResponse, LoginRequest, LoginResponseDto, RegisterRequest, User } from '../models/commonModels';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://localhost:7110/api/Authentication';

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService
  ) {}

  login(request: LoginRequest): Observable<APIResponse<LoginResponseDto>> {
    return this.http.post<APIResponse<LoginResponseDto>>(`${this.baseUrl}/login`, request).pipe(
      tap(response => {
        if (response.result && response.data) {
          this.storeUserData(response.data);
        }
      }),
      catchError(error => {
        Swal.fire('Login Failed', 'Invalid credentials or server error', 'error');
        throw error;
      })
    );
  }

  register(request: RegisterRequest): Observable<APIResponse<void>> {
    return this.http.post<APIResponse<void>>(`${this.baseUrl}/register`, request).pipe(
      tap(() => Swal.fire('Success', 'Registration successful!', 'success')),
      catchError(error => {
        Swal.fire('Registration Failed', 'Error occurred during registration', 'error');
        throw error;
      })
    );
  }

  logout(): void {
    this.storageService.removeItem('user');
    this.storageService.removeItem('token');
    Swal.fire('Logged Out', 'You have been successfully logged out.', 'success');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = this.storageService.getItem('token');
    return token !== null && !this.isTokenExpired(token);
  }

  getCurrentUser(): User | null {
    const userData = this.storageService.getItem('user');
    if (!userData) return null;
  
    try {
      return JSON.parse(userData);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  getToken(): string | null {
    return this.storageService.getItem('token');
  }

  public storeUserData(data: LoginResponseDto): void {
    const userData = {
      userId: data.userId,
      userName: data.userName,
      token: data.token,
      refreshToken: data.refreshToken,
    };
    console.log('Storing User Data:', userData); // Log the user data before encryption
    this.storageService.setItem('user', JSON.stringify(userData));
    this.storageService.setItem('token', data.token);
  }
  public isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  }
}
