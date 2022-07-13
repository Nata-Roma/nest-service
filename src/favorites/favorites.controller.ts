import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseUUIDPipe } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('track/:id')
  @HttpCode(201)
  createTrack(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.favoritesService.createTrack(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  createArtist(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.favoritesService.createArtist(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  CreateAlbum(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.favoritesService.createAlbum(id);
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.favoritesService.removeTrack(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.favoritesService.removeArtist(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.favoritesService.removeAlbum(id);
  }
}
