export interface ILogin {
  email: string;
  password: string;
}

export interface IAuthError {
  status: number;
  error: string;
}

export interface IAuthErrorMessage {
  error: {
    status: number;
    error: string;
    message?: string;
  };
  status: number;
  message: string;
  name: string;
  ok: boolean;
  url?: string;
}

export interface IAuthToken {
  token: string;
}
