import { Controller, Delete, Get, Param } from '@nestjs/common';
import { BoxesService } from './boxes.service';
import { ItemsCount } from '../../types/products';
import { BoxWithProductsDto, DeleteBox } from '../../types/boxes';

@Controller('boxes')
export class BoxesController {
  constructor(private readonly boxesService: BoxesService) {}

  @Get()
  getBoxesWithProducts(): Promise<BoxWithProductsDto[] | null> {
    return this.boxesService.getBoxesWithProducts();
  }

  @Get('count')
  getCountBoxes(): Promise<ItemsCount> {
    return this.boxesService.getCountBoxes();
  }

  @Get('current')
  getCurrentBox(): Promise<BoxWithProductsDto | null> {
    return this.boxesService.getCurrentBox();
  }

  @Delete(':id')
  deleteBowWithProducts(@Param('id') id: string): Promise<DeleteBox> {
    return this.boxesService.deleteBowWithProducts(id);
  }
}
