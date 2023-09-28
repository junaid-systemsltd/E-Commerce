import { CartItem, PaymentMethods, ShippingAddress } from './cart';

export type Order = {
    orderItems: CartItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: PaymentMethods;
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
};
