export interface ILogin {
  email: string;
  password: string;
}

export interface IAuthError {
  status: number;
  message: string;
}

export interface IAuthToken {
  token: string;
}
