import { Injectable } from '@nestjs/common';
import { Product } from './entities/products.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteProduct,
  ItemsCount,
  ProductDto,
  ProductWithStatus,
} from '../../types/products';
import { Box } from '../boxes/entities/boxes.entity';
import { BoxDto } from '../../types/boxes';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Box)
    private readonly boxRepository: Repository<Box>,
  ) {}

  async getCountProducts(): Promise<ItemsCount> {
    const count = await this.productRepository.count();
    return { itemsCount: count };
  }

  async getProducts(): Promise<ProductDto[]> {
    const products = await this.productRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    const productsDto: ProductDto[] = products.map((product) =>
      this.productMapToDto(product),
    );

    return productsDto;
  }

  async createProduct(name: string): Promise<ProductWithStatus> {
    try {
      const existProduct = await this.productRepository.findOne({
        where: { name },
      });
      if (existProduct) {
        return { status: 409, result: null };
      } else {
        const result: { resultProduct: Product; resultBox: Box } =
          await this.addProductToBox(name);

        const productDto: ProductDto = this.productMapToDto(
          result.resultProduct,
        );

        const boxDto: BoxDto = this.boxMapToDto(result.resultBox);

        return { status: 200, result: { product: productDto, box: boxDto } };
      }
    } catch (e) {
      console.log('Error-catch file ProductsService', e);
      return { status: 500, result: null };
    }
  }

  private async addProductToBox(name: string) {
    // поиск коробки у которой менее 5 продуктов
    const box = await this.boxRepository.findOne({
      where: {},
      order: { createdAt: 'DESC' },
    });

    if (!box) {
      // база пуста
      const newNumberName = 1;
      const newBox = this.boxRepository.create({
        numberName: newNumberName,
        isFull: false,
      });

      const resultBox = await this.boxRepository.save(newBox);

      const resultProduct: Product = await this.createProductInDb(name, newBox);

      return { resultProduct, resultBox };
    } else {
      const isFullBox = box.isFull;
      if (isFullBox) {
        // крайняя коробка имеет более 5 продуктов (создаем новую коробку)
        const newNumberName = box.numberName + 1;

        const newBox = this.boxRepository.create({
          numberName: newNumberName,
          isFull: false,
        });

        const resultBox = await this.boxRepository.save(newBox);

        const resultProduct: Product = await this.createProductInDb(
          name,
          newBox,
        );

        return { resultProduct, resultBox };
      } else {
        // крайняя коробка имеет менее 5 продуктов (добавляем продукт в эту коробку)
        const resultProduct: Product = await this.createProductInDb(name, box);

        const productsCount = await this.productRepository.count({
          where: {
            box: { id: box.id },
          },
        });

        if (productsCount >= 5) {
          box.isFull = true;
          await this.boxRepository.save(box);
        }

        return {
          resultProduct,
          resultBox: box,
        };
      }
    }
  }

  private createProductInDb(name: string, box: Box): Promise<Product> {
    const newProduct = this.productRepository.create({
      name,
      box,
    });

    return this.productRepository.save(newProduct);
  }

  private productMapToDto(product: Product): ProductDto {
    return {
      id: product.id,
      name: product.name,
      createdAt: product.createdAt.toISOString(),
    };
  }

  private boxMapToDto(box: Box): BoxDto {
    return {
      id: box.id,
      name: `Коробка #${box.numberName}`,
      isFull: box.isFull,
      createdAt: box.createdAt.toISOString(),
    };
  }

  async deleteProduct(id: string): Promise<DeleteProduct> {
    try {
      const product = await this.productRepository.findOne({
        where: { id },
        relations: ['box'],
      });

      if (!product) {
        return { status: 404, idBox: '' };
      }

      const idBox = product.box.id;

      await this.productRepository.delete(id);

      const remainingProducts = await this.productRepository.count({
        where: { box: { id: idBox } },
      });

      if (remainingProducts <= 0) {
        await this.boxRepository.delete(idBox);
      } else {
        await this.boxRepository.update(idBox, { isFull: false });
      }

      return { status: 200, idBox };
    } catch (e) {
      console.log('Error-catch file ProductsService', e);
      return { status: 500, idBox: '' };
    }
  }
}
