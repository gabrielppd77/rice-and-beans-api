import { Product, ProductProps } from '@domain/entities/product';

export function makeProduct(override?: Partial<ProductProps>) {
  const product = new Product({
    categoryId: '123456789',
    description: 'description product',
    name: 'Pizza Calabresa',
    photoUrl: 'http://www.cafes.com',
    price: 60.5,
    ...override,
  });

  return product;
}
