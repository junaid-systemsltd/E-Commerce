import { CartItem, PaymentMethods, ShippingAddress } from './cart';

export type Order = {
    orderItems: CartItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: PaymentMethods;
    itemsPrice: string;
    shippingPrice: string;
    taxPrice: string;
    totalPrice: string;
};
