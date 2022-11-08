import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: configValidationSchema,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
