export interface LoginRequest {
    userName: string;
    password: string;
  }
  export interface LoginResponseDto {
    userId: number;
    token: string;
    userName: string;
    refreshToken: string;

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
  

  export interface Passenger {
    passengerId: number;
    bookingId: number;
    passengerName: string;
    age: number;
    gender: string;
    seatNo: number;
  }
  
  export interface Booking {
    bookingId: number;
    custId: number;
    bookingDate: string;
    scheduleId: number;
    busBookingPassengers: Passenger[];
    schedule?: Schedule; // Optional until fetched
  }
  
  export interface Schedule {
    scheduleId: number;
    vendorId: number;
    busName: string;
    busVehicleNo: string;
    fromLocationId: number;
    toLocationId: number;
    departureTime: string;
    arrivalTime: string;
    scheduleDate: string;
    price: number;
    totalSeats: number;
    availableSeats: number;
    fromLocationName?: string;
    toLocationName?: string;
  }
  