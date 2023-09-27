import { Rating, ReviewType } from '@/types/product';
import prisma from '../utils/prisma';
import { User } from '@prisma/client';

export const addProductReview = async (
    userRating: Rating,
    user: User,
    productId: number,
) => {
    const { comment, rating } = userRating;

    const alreadyReviewed = await prisma.review.count({
        where: { product_id: productId, user_id: user.id },
    });

    if (alreadyReviewed) {
        return {
            status: false,
            message: null,
            error: 'Product already reviewed',
        };
    }

    const review = {
        rating,
        comment,
        name: user.name,
        user_id: user.id,
        product_id: productId,
    };

    const reviews = await prisma.review.findMany({
        where: { product_id: productId },
    });

    await prisma.review.create({ data: review });

    const totalProductReviews = await prisma.review.count({
        where: { product_id: productId },
    });

    const productRating =
        reviews.reduce(
            (acc: number, item: ReviewType) => item.rating + acc,
            0,
        ) / reviews.length;

    await prisma.product.update({
        where: { id: productId },
        data: {
            rating: productRating,
            numReviews: totalProductReviews,
        },
    });

    return {
        status: true,
        message: 'Review added',
        error: null,
    };
};
