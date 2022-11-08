import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsNumber(
    {
      maxDecimalPlaces: 2,
    },
    {
      message: `Price must be number and can contain max 2 decimal places`,
    },
  )
  price: number;
}
