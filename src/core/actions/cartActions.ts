'use server';
import { CartItem, PaymentMethods, ShippingAddress } from '@/types/cart';
import { cookies }                                   from 'next/headers';

export async function saveCartsItemsInCookies(cartItems: CartItem[]) {
    //@ts-ignore
    cookies().set('cart', JSON.stringify(cartItems));
}

export async function saveShippingAddressInCookies(
    shippingAddress: ShippingAddress,
) {
    //@ts-ignore
    cookies().set( 'shipping_address', JSON.stringify( shippingAddress ) );
}

export async function savePaymentMethodInCookie( paymentMethod: PaymentMethods ) {
    //@ts-ignore
    cookies().set( 'payment_method', JSON.stringify( paymentMethod ) );
}


export async function clearCartDataFromCookie() {
    //@ts-ignore
    cookies().delete( 'cart' );
    //@ts-ignore
    cookies().delete( 'shipping_address' );
    //@ts-ignore
    cookies().delete( 'payment_method' );
}
