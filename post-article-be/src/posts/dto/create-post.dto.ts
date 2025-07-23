import { IsString, MinLength, IsIn } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(20)
  title: string;

  @IsString()
  @MinLength(200)
  content: string;

  @IsString()
  @MinLength(3)
  category: string;

  @IsString()
  @IsIn(['publish', 'draft', 'thrash'])
  status: string;
}
