import { IdAndNameProducts } from './products';

export type BoxDto = {
  id: string;
  name: string;
  isFull: boolean;
  createdAt: string;
};

export type BoxWithProductsDto = {
  id: string;
  name: string;
  isFull: boolean;
  products: IdAndNameProducts[];
  createdAt: string;
};

export type DeleteBox = {
  status: number;
  productIds: string[];
};
