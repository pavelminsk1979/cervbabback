import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Box } from './entities/boxes.entity';
import { ItemsCount } from '../../types/products';
import { BoxWithProductsDto, DeleteBox } from '../../types/boxes';

@Injectable()
export class BoxesService {
  constructor(
    @InjectRepository(Box)
    private readonly boxRepository: Repository<Box>,
  ) {}

  async getBoxesWithProducts(): Promise<BoxWithProductsDto[] | null> {
    const boxes = await this.boxRepository
      .createQueryBuilder('box')
      .leftJoinAndSelect('box.products', 'product')
      .orderBy('product.createdAt', 'DESC')
      .getMany();

    if (!boxes.length) return null;

    const boxexWithProductsDto = boxes.map((box) =>
      this.boxMapWithProductsToDto(box),
    );

    return boxexWithProductsDto;
  }

  async getCurrentBox(): Promise<BoxWithProductsDto | null> {
    const box = await this.boxRepository
      .createQueryBuilder('box')
      .leftJoinAndSelect('box.products', 'product')
      .where('box.isFull = false')
      .orderBy('product.createdAt', 'DESC')
      .getOne();

    if (!box) return null;

    const result: BoxWithProductsDto = this.boxMapWithProductsToDto(box);

    return result;
  }

  private boxMapWithProductsToDto(box: Box): BoxWithProductsDto {
    const products = box.products.map((p) => {
      return {
        id: p.id,
        name: p.name,
      };
    });
    return {
      id: box.id,
      name: `Коробка #${box.numberName}`,
      isFull: box.isFull,
      products,
      createdAt: box.createdAt.toISOString(),
    };
  }

  async getCountBoxes(): Promise<ItemsCount> {
    const count = await this.boxRepository.count();
    return { itemsCount: count };
  }

  async deleteBowWithProducts(id: string): Promise<DeleteBox> {
    try {
      const box = await this.boxRepository.findOne({
        where: { id },
        relations: ['products'],
      });
      if (!box) {
        return { status: 404, productIds: [] };
      }

      const productIds = box.products.map((p) => p.id);

      await this.boxRepository.remove(box);
      return { status: 200, productIds };
    } catch (e) {
      console.log(
        'Error-catch in BoxesService method-deleteBowWithProducts',
        e,
      );
      return { status: 500, productIds: [] };
    }
  }
}
