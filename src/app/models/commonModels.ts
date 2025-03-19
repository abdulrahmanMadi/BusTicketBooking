export interface LoginRequest {
    userName: string;
    password: string;
  }
  
  export interface RegisterRequest {
    userName: string;
    emailId: string;
    fullName: string;
    roleId: number;
    password: string;
    contactNo?: string;
  }
  
  export interface APIResponse<T> {
    message: string;
    result: boolean;
    data?: T;
  }
  
  export interface User {
    userName: string;
    token: string;
    refreshToken: string;
  }
  