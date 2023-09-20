'use client';
import { User } from '@prisma/client';
import { ReactNode, createContext, useState, useContext } from 'react';

const UserContext = createContext<any>({});

type UserProviderProps = {
    children: ReactNode;
    cookie: any;
    getCookie?: (name: string) => void;
    clearCookie?: (name: string) => void;
};

export default function UserProvider({ children, cookie }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(() =>
        cookie ? JSON.parse(cookie.value) : null,
    );

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {' '}
            {children}{' '}
        </UserContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(UserContext);

    if (!context)
        throw new Error('Please use UserProvider in Parent Component');

    return context;
};
