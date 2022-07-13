import { IsOptional, IsString } from 'class-validator';

export class CreateFavoriteDto {
  @IsOptional()
  @IsString()
  artist: string;

  @IsOptional()
  @IsString()
  album: string;

  @IsOptional()
  @IsString()
  track: string;
}
