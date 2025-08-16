export interface ILogin {
  email: string;
  password: string;
}

export interface IError {
  status: number;
  message: string;
}

export interface IAuthToken {
  token: string;
}
