'use server';
import prisma from '../utils/prisma';

export const fetchOrdersById = async (id: string): Promise<any> => {
    const order = await prisma.order.findUnique({
        where: { id: Number(id) },
        include: {
            user: true,
            shipping_address: true,
            order_items: true,
        },
    });

    return order;
};

export const fetchAllOrders = async (): Promise<any> =>
    await prisma.order.findMany({
        include: {
            user: true,
            shipping_address: true,
            order_items: true,
        },
    });
