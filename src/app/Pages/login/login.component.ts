import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.authService.login(this.form.value).subscribe(
      (response) => {
        if (response.result) {
          window.location.href = '/';
        } else {
          this.errorMessage = response.message;
          Swal.fire('Login Failed', response.message, 'error');
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred. Please try again later.';
        Swal.fire('Error', 'An error occurred. Please try again later.', 'error');
      }
    );
  }
}
