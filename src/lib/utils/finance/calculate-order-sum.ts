import type { Product } from '#server/cms/collections/types';

const PURCHASE_FEE_PERCENTAGE =
  +process.env.NEXT_PUBLIC_PURCHASE_FEE_PERCENTAGE!;

const roundPrice = (price: number) => +price.toFixed(2);

export const calculatOrderSum = (products: Product[]) => {
  const subTotalPrice = roundPrice(
    products.reduce((subTotalPrice, { price }) => {
      return subTotalPrice + price;
    }, 0)
  );

  const fee = roundPrice(PURCHASE_FEE_PERCENTAGE * 1e-2 * subTotalPrice);

  const totalPrice = roundPrice(subTotalPrice + fee);

  return {
    subTotalPrice,
    fee,

    totalPrice,
  };
};