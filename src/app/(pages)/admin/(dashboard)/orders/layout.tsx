import { ReactNode } from 'react';

export default function AdminOrdersLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <>
            <h1>Orders</h1>
            {children}
        </>
    );
}
