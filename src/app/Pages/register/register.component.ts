import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../Services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      password: ['', Validators.required],
      contactNo: [''],
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;
    this.authService.register(this.registerForm.value).subscribe(
      (response) => {
        if (response.result) {
          Swal.fire('Registration Successful', 'You can now log in.', 'success');
          window.location.href = '/login';
        } else {
          this.errorMessage = response.message;
          Swal.fire('Registration Failed', response.message, 'error');
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred. Please try again later.';
        Swal.fire('Error', 'An error occurred. Please try again later.', 'error');
      }
    );
  }
}
