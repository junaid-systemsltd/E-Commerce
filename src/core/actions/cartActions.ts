'use server';
import { CartItem, PaymentMethods, ShippingAddress } from '@/types/cart';
import { cookies } from 'next/headers';

export async function saveCartsItemsInCookies(cartItems: CartItem[]) {
    cookies().set('cart', JSON.stringify(cartItems));
}

export async function saveShippingAddressInCookies(
    shippingAddress: ShippingAddress,
) {
    cookies().set('shipping_address', JSON.stringify(shippingAddress));
}

export async function savePaymentMethodInCookie(paymentMethod: PaymentMethods) {
    cookies().set('payment_method', JSON.stringify(paymentMethod));
}
