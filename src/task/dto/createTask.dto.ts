import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTask {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  done: boolean;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
