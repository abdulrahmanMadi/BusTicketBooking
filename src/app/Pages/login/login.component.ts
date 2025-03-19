import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../Services/auth.service';
import { LoginRequest } from '../../models/commonModels';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  AuthService = inject(AuthService);
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Please fill in all required fields correctly.',
        width: '400px'
      });
      return;
    }

    const formData: LoginRequest = this.form.value;

    this.AuthService.login(formData).subscribe(
      (response) => {
        if (response.result && response.data) {
          const { token, refreshToken } = response.data;

          if (token && refreshToken) {
            this.AuthService.saveTokens(token, refreshToken);

            Swal.fire({
              icon: 'success',
              title: 'Login Successful',
              text: response.message,
              width: '400px',
              timer: 2000
            }).then(() => {
              this.router.navigate(['/']).then(() => window.location.reload());
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Login Failed',
              text: 'Token or refresh token is missing.',
              width: '400px'
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: response.message,
            width: '400px'
          });
        }
      },
      (error) => {
        const errorMessage = error.error?.message || 'Please try again later.';
        Swal.fire({
          icon: 'error',
          title: 'An Error Occurred',
          text: errorMessage,
          width: '400px'
        });
        console.error('An error occurred:', error);
      }
    );
  }
}