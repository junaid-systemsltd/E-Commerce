'use client';

import { fetchProduct } from '@/core/services/products';
// import { fetchProduct } from '@/core/services/products';
import { IProduct } from '@/types/product';
import { ReactNode, createContext, useState, useContext } from 'react';

const CartContext = createContext<any>({});

type CartProviderProps = {
    children: ReactNode;
};

type CartItem = {
    product: number;
    name: string;
    image: string;
    price: number;
    count_in_stock: number;
    qty: number;
};

type ShippingAddress = {
    address: string;
    city: string;
    postalCode: string;
    country: string;
};

export enum PaymentMethods {
    Paypal,
    Stripe,
}

type Prices = {
    itemsPrice: number | string;
    shippingPrice: number | string;
    taxPrice: number | string;
    totalPrice: number | string;
};

type useCartFunc = {
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

export default function CartProvider({ children }: CartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>();
    const [loading, setLoading] = useState(false);

    const [prices, setPrices] = useState<Prices>({
        itemsPrice: 0,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 0,
    });

    // Action Methods
    const addToCart = async (id: number, qty: number) => {
        setLoading(true);
        const product: IProduct = await fetchProduct(id);
        const item = {
            product: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.count_in_stock,
            qty,
        };
        const existingItem = cartItems.find(
            (x: CartItem) => x.product === item.product,
        );
        if (existingItem) {
            setCartItems((prevCartItems: any) =>
                prevCartItems.map((cartItem: CartItem) =>
                    cartItem.product === item.product ? item : cartItem,
                ),
            );
        } else {
            setCartItems((prevCartItems: any) => [...prevCartItems, item]);
        }
        setLoading(false);
    };

    const removeFromCart = async (id: number) => {
        setCartItems((prevCartItems: any) =>
            prevCartItems.filter(
                (cartItem: CartItem) => cartItem.product != id,
            ),
        );
        // save cart in cookies
    };

    const saveShippingAddress = (data: any) => {
        setShippingAddress(data);
    };

    const savePaymentMethod = (data: any) => {
        setPaymentMethod(data);
    };

    return (
        <CartContext.Provider
            value={{
                prices,
                loading,
                cartItems,
                paymentMethod,
                shippingAddress,
                addToCart,
                setPrices,
                removeFromCart,
                savePaymentMethod,
                saveShippingAddress,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = (): useCartFunc => {
    const context = useContext(CartContext);

    if (!context)
        throw new Error('Please use CartProvider in Parent Component');

    return context;
};
