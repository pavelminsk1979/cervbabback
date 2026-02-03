import { Module } from '@nestjs/common';
import { Product } from '../products/entities/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Box } from './entities/boxes.entity';
import { BoxesController } from './boxes.controller';
import { BoxesService } from './boxes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Box])],
  controllers: [BoxesController],
  providers: [BoxesService],
  exports: [BoxesService],
})
export class BoxesModule {}
