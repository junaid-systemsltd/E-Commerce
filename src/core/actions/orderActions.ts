'use server';
import { Order } from '@/types/order';
import { CartItem } from '@/types/cart';
import prisma from '../utils/prisma';

export const addOrderItemsActions = async (order: Order, userId: number) => {
    const {
        itemsPrice,
        orderItems,
        paymentMethod,
        shippingAddress,
        shippingPrice,
        taxPrice,
        totalPrice,
    } = order;

    if (orderItems && orderItems.length === 0) {
        return {
            status: false,
            message: 'No order Items',
        };
    }

    // Creating Shipping Address Record
    const { address, city, country, postalCode } = shippingAddress;
    const shippingAddressRecord = await prisma.shippingAddress.create({
        data: {
            address,
            city,
            country,
            postal_code: postalCode,
        },
    });

    // Creating Multiple Order Items
    const orderItemsData = orderItems.map(
        ({ image, name, price, qty }: CartItem) => ({
            image,
            name,
            price,
            qty,
        }),
    );

    const createdOrder = await prisma.order.create({
        data: {
            tax_price: taxPrice,
            shipping_price: shippingPrice,
            total_price: totalPrice,
            order_items: { createMany: { data: orderItemsData } },
            user_id: userId,
            shipping_address_id: shippingAddressRecord.id,
            delivered_at: new Date(),
            paid_at: new Date(),
        },
    });

    return createdOrder;
};

export const getUserOrders = async (id: number) => {
    const orders = await prisma.order.findMany({ where: { user_id: id } });
    return orders;
};
