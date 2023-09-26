import { ReactNode } from 'react';

export default function AdminUsersLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <>
            <h1>Users</h1>
            {children}
        </>
    );
}
