import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports:[FormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginObj: Login;
  constructor(private http:HttpClient){
    this.loginObj = new Login();
  }
  onLogin(){
    debugger;
    return this.http.post('https://localhost:7110/api/Authentication/login', this.loginObj).subscribe((res:any)=>{
      if(res.result){
        alert("Login successful ")
      }else{
        alert("Invalid credentials")
      }
    });

  }
}
export class Login{
  userName: string;
  password: string;
  constructor(){
    this.userName = '';
    this.password = '';
  }
}