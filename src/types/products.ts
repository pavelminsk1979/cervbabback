export type ProductWithStatus = {
  status: number;
  product: ProductDto;
};

export type ProductDto = {
  id: string;
  name: string;
  createdAt: string;
};
