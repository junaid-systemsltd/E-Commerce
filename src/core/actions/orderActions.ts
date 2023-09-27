import { Order } from '@/types/order';
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

    const shippingRecord = await prisma.shippingAddress.create({
        data: {
            address: shippingAddress.address,
            city: shippingAddress.city,
            postal_code: shippingAddress.postalCode,
            country: shippingAddress.country,
        },
    });

    const orderRecord = await prisma.orderItems.create({ data: {} });

    const createdOrder = prisma.order.create({
        data: {
            oreder_id: orderItems,
            shipping_address_id: shippingRecord.id,
            shipping_price: Number(shippingPrice),
            tax_price: Number(taxPrice),
            total_price: Number(totalPrice),
            user_id: userId,
        },
    });
};
