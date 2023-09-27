'use client';

import { addOrderItemsActions } from '@/core/actions/orderActions';
import { Order } from '@/types/order';
import { ReactNode, createContext, useState } from 'react';
import { useAuth } from './UserContext';

const OrderContext = createContext({});

type OrderProviderProps = {
    children: ReactNode;
};

export default function OrderProvider({ children }: OrderProviderProps) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [order, setOrder] = useState<Order | null>(null);
    const { user } = useAuth();

    const createOrder = async (order: Order) => {
        setLoading(true);

        const res = await addOrderItemsActions(order, user.id);
    };
}
