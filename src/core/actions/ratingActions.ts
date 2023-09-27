'use server';
import { Rating } from '@/types/product';
import prisma from '../utils/prisma';
import { User } from '@prisma/client';

export const addProductReview = async (
    userRating: Rating,
    user: User,
    productId: number,
) => {
    const { comment, rating } = userRating;

    // Counter to check whether user has already reviewed this product or not
    const alreadyReviewed = await prisma.review.count({
        where: { product_id: productId, user_id: user.id },
    });

    // Return if already Reviewed this product
    if (alreadyReviewed > 0) {
        return {
            status: false,
            message: null,
            error: 'You already reviewed this Product',
        };
    }

    // Creating Review in Review DB
    await prisma.review.create({
        data: {
            rating,
            comment,
            name: user.name,
            user_id: user.id,
            product_id: productId,
        },
    });

    // Getting All Reviews to Calculate total reviews
    const reviews = await prisma.review.findMany({
        where: { product_id: productId },
        select: { rating: true },
    });

    const totalProductReviews = await prisma.review.count({
        where: { product_id: productId },
    });

    const productRating =
        reviews.reduce(
            (acc: number, { rating }: { rating: number }) => rating + acc,
            0,
        ) / reviews.length;

    await prisma.product.update({
        where: { id: productId },
        data: {
            rating: productRating,
            num_of_reviews: totalProductReviews,
        },
    });

    return {
        status: true,
        message: 'Review Success fully  added',
        error: null,
    };
};
