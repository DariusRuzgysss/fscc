export type LoginForm = {
  email: string;
  password: string;
};

export type LoginRequest = {
  userName: string;
  password: string;
};

export type Auth = {
  userName: string;
  accessToken: string;
  refreshToken: string;
};
