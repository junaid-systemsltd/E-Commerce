'use server';
import prisma from '@/core/utils/prisma';

import { IProduct } from '@/types/product';

export const fetchProduct = async (slug: string): Promise<any> => {
    const product = await prisma.product
        .findUnique({
            where: { id: Number(slug) },
            select: {
                id: true,
                name: true,
                image: true,
                brand: true,
                category: true,
                description: true,
                rating: true,
                num_of_reviews: true,
                price: true,
                count_in_stock: true,
                reviews: true,
            },
        })
        .finally(() => {
            prisma.$disconnect();
        });

    return product;
};

export const fetchProductsList = async (): Promise<IProduct[]> => {
    const products = await prisma.product.findMany({
        select: {
            id: true,
            name: true,
            image: true,
            brand: true,
            category: true,
            description: true,
            rating: true,
            num_of_reviews: true,
            price: true,
            count_in_stock: true,
        },
    });
    return products;
};
