import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProduct } from './products.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async fetchProducts(): Promise<IProduct[]> {
    return await this.productsService.fetchProducts();
  }

  @Get(':id')
  async fetchProduct(@Param('id') id: string): Promise<IProduct> {
    return await this.productsService.fetchProduct(+id);
  }

  // @Patch(':id')
  // async updateProduct(
  //   @Param('id') id: string,
  //   @Body() updateProductDto: UpdateProductDto,
  // ) {
  //   return await this.productsService.updateProduct(+id, updateProductDto);
  // }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<IProduct> {
    return await this.productsService.updateProduct(+id, updateProductDto);
  }

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<IProduct> {
    return await this.productsService.createProduct(createProductDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async removeProduct(@Param('id') id: string): Promise<void> {
    await this.productsService.removeProduct(+id);
  }
}
