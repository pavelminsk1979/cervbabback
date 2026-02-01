import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './features/products/products.module';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOSTBD,
      port: Number(process.env.PORTBD),
      username: process.env.USERNAMEBD,
      password: process.env.PASSWORDBD,
      database: process.env.NAMEBD,
      autoLoadEntities: true,
      synchronize: false,
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
