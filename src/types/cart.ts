export type CartItem = {
    product: number;
    name: string;
    image: string;
    price: number;
    count_in_stock: number;
    qty: number;
};

export type ShippingAddress = {
    address: string;
    city: string;
    postalCode: string;
    country: string;
};

export enum PaymentMethods {
    Paypal = 'Paypal',
    Stripe = 'Stripe',
}

export type Prices = {
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
};

export type UseCart = {
    prices: Prices;
    loading: boolean;
    cartItems: CartItem[];
    paymentMethod: PaymentMethods;
    shippingAddress: ShippingAddress;
    setPrices: (prices: Prices) => void;
    saveShippingAddress: (data: any) => void;
    removeFromCart: (id: string) => Promise<void>;
    addToCart: (id: string, qty: number) => Promise<void>;
    savePaymentMethod: (paymentMethod: PaymentMethods) => void;
};
