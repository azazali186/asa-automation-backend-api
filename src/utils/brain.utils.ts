import { ProductInteractionTypeEnum } from 'src/enum/product-interation-type.enum';

export const WEIGHTS = {
  views: 1,
  like: 2,
  comment: 2,
  add_to_cart: 3,
  add_to_wishlist: 4,
  purchased: 5,
  review: 5,
};

export const getIntractionValue = async (
  intraction: ProductInteractionTypeEnum,
) => {
  return WEIGHTS[intraction] || 0;
};

export const getRandomProductInteractionType =
  (): ProductInteractionTypeEnum => {
    const values = Object.values(ProductInteractionTypeEnum);
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex] as ProductInteractionTypeEnum;
  };
