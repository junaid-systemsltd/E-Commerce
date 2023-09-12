export interface IProduct {
  id: number;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  rating: number;
  numReviews: number;
  price: number;
  count_in_stock: number;
}

export type ProductDetailType = {
  params: {
    slug: string;
  };
};

export type RatingType = {
  value: number;
  text: string;
  color?: string;
};
