'use client';

import {
    clearCartDataFromCookie,
    saveCartsItemsInCookies,
    savePaymentMethodInCookie,
    saveShippingAddressInCookies,
} from '@/core/actions/cartActions';
import { fetchProduct } from '@/core/services/products';
import {
    CartItem,
    PaymentMethods,
    ShippingAddress,
    Prices,
    UseCart,
} from '@/types/cart';
import { IProduct } from '@/types/product';
import { ReactNode, createContext, useState, useContext } from 'react';

const CartContext = createContext<any>({});

type CartProviderProps = {
    children: ReactNode;
    cookie: {
        cartItems: any;
        shippingAddress: any;
        paymentMethod: any;
    };
};

export default function CartProvider({ children, cookie }: CartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>(
        getInitialCartItems(cookie),
    );

    const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(
        getInitialShippingAddress(cookie),
    );

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>(
        getInitialPaymentMethod(cookie),
    );

    const [loading, setLoading] = useState<boolean>(false);

    const [prices, setPrices] = useState<Prices>({
        itemsPrice: 0,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 0,
    });

    // Action Methods
    const addToCart = async (id: string, qty: number) => {
        setLoading(true);
        const product: IProduct = await fetchProduct(id);
        const item = {
            product: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            count_in_stock: product.count_in_stock,
            qty,
        };
        const existingItem = cartItems.find(
            (x: CartItem) => x.product === item.product,
        );
        if (existingItem) {
            setCartItems((prevCartItems: any) => {
                const result = prevCartItems.map((cartItem: CartItem) =>
                    cartItem.product === item.product ? item : cartItem,
                );

                saveCartsItemsInCookies(result);
                return result;
            });
        } else {
            setCartItems((prevCartItems: any) => {
                const result = [...prevCartItems, item];
                saveCartsItemsInCookies(result);
                return result;
            });
        }
        setLoading(false);
    };

    const removeFromCart = async (id: number) => {
        setCartItems((prevCartItems: any) => {
            const result = prevCartItems.filter(
                (cartItem: CartItem) => cartItem.product != id,
            );
            saveCartsItemsInCookies(result);
            return result;
        });
    };

    const saveShippingAddress = (data: ShippingAddress) => {
        setShippingAddress(data);
        saveShippingAddressInCookies(data);
    };

    const savePaymentMethod = (data: any) => {
        setPaymentMethod(data);
        savePaymentMethodInCookie(data);
    };

    const clearData = async () => {
        setPrices({
            itemsPrice: 0,
            shippingPrice: 0,
            taxPrice: 0,
            totalPrice: 0,
        });

        await clearCartDataFromCookie();

        setPaymentMethod(PaymentMethods.Paypal);
        setLoading(false);
        setCartItems([]);
        setShippingAddress({
            address: '',
            city: '',
            postalCode: '',
            country: '',
        });
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
                clearData,
                removeFromCart,
                savePaymentMethod,
                saveShippingAddress,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = (): UseCart => {
    const context = useContext(CartContext);

    if (!context)
        throw new Error('Please use CartProvider in Parent Component');

    return context;
};

// Initial State Functions

function getInitialCartItems(cookie: any) {
    try {
        return JSON.parse(cookie.cartItems.value);
    } catch (e) {
        return [];
    }
}

function getInitialShippingAddress(cookie: any) {
    try {
        return JSON.parse(cookie.shippingAddress.value);
    } catch (e) {
        return {
            address: '',
            city: '',
            postalCode: '',
            country: '',
        };
    }
}

function getInitialPaymentMethod(cookie: any) {
    return cookie.paymentMethod
        ? cookie.paymentMethod.value
        : PaymentMethods.Paypal;
}
