export interface User {
  id: string;
  email: string;
  isAdmin: boolean;
  name: string;
  password?: string;
}

export type UserRequestBody = {
  email: string;
  password: string;
};

export type UserState = {
  user: User;
  setUser(user: User | null): void;
};
