export interface User {
    id: string;
    email: string;
    isAdmin: boolean;
    name: string;
    password?: string;
}

export type UserLoginFields = {
    email: string;
    password: string;
};

export type UserRegisterFields = {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
};

export type UserState = {
    user: User;
    setUser(user: User | null): void;
};
