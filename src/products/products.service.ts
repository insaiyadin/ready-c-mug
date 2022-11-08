import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProduct } from './products.interface';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto): Promise<IProduct> {
    const { name, price } = createProductDto;
    return await this.prismaService.product.create({
      data: {
        name,
        price,
      },
    });
  }

  async fetchProducts(): Promise<IProduct[]> {
    return await this.prismaService.product.findMany();
  }

  async fetchProduct(id: number): Promise<IProduct> {
    const found = await this.prismaService.product.findUnique({
      where: {
        id,
      },
    });
    if (!found) throw new NotFoundException('This product does not exist');
    return found;
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<IProduct> {
    const { name, price } = updateProductDto;
    try {
      return await this.prismaService.product.update({
        where: {
          id,
        },
        data: {
          name,
          price,
        },
      });
    } catch (err) {
      if (err.code === 'P2025') {
        throw new NotFoundException('This product does not exist');
      }
      throw new InternalServerErrorException('An error occurred');
    }
  }

  async removeProduct(id: number): Promise<void> {
    try {
      await this.prismaService.product.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      if (err.code === 'P2025') {
        throw new NotFoundException('This product does not exist');
      }
      throw new InternalServerErrorException('An error occurred');
    }
  }
}
