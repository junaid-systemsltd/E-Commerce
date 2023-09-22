import { ReactNode } from 'react';

export default function AdminProductsLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <>
            <h1>Products</h1>
            {children}
        </>
    );
}
