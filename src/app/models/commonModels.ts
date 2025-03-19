
export interface ILogin {
    userName: string;
    password: string;
}


export interface IRegister {
    UserName: string;
    EmailId: string;
    FullName: string;
    RoleId: number;
    Password: string;
    ContactNo: string;

}

export interface APIResponse<T> {
    status?: boolean;
    message?: string;
    data: T;
}
