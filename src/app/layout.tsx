// Libs
import Script from 'next/script';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Toaster } from 'react-hot-toast';

// Modules
import Header from '@/components/modules/header';
import { Container } from '@/components/elements';
import CartProvider from '@/contexts/CartContext';
import UserContextProvider from '@/contexts/UserContext';

// CSS
import './globals.css';
import '../assets/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const metadata: Metadata = {
    title: 'E-Commerce',
    description: 'Generated by create next app',
};

type RootLayoutProps = {
    children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
    const userCookie = cookies().get('user');
    const cartCookie = cookies().get('cart');
    const shippingAddressCookie = cookies().get('shipping_address');
    const paymentMethodCookie = cookies().get('payment_method');

    return (
        <html lang="en">
            <body>
                <UserContextProvider cookie={userCookie}>
                    <CartProvider
                        cookie={{
                            cartItems: cartCookie,
                            paymentMethod: paymentMethodCookie,
                            shippingAddress: shippingAddressCookie,
                        }}
                    >
                        <Header />
                        <main className="py-3">
                            <Container>{children}</Container>
                        </main>
                    </CartProvider>
                </UserContextProvider>
                <Toaster />
            </body>
            <Script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
                crossOrigin="anonymous"
            ></Script>
        </html>
    );
}
