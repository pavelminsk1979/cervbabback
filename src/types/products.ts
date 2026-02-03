import { BoxDto } from './boxes';

export type ProductWithStatus = {
  status: number;
  result: ResultProductAndBox | null;
};

export type ProductDto = {
  id: string;
  name: string;
  createdAt: string;
};

export type ItemsCount = {
  itemsCount: number;
};

export type ResultProductAndBox = {
  product: ProductDto;
  box: BoxDto;
};

export type IdAndNameProducts = {
  id: string;
  name: string;
};

export type DeleteProduct = {
  status: number;
  idBox: string;
};
