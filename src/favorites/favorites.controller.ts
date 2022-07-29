import { JwtAuthGuard } from './../auths/jwt-auth.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('track/:id')
  @HttpCode(201)
  createTrack(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.favoritesService.createTrack(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('artist/:id')
  @HttpCode(201)
  createArtist(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.favoritesService.createArtist(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('album/:id')
  @HttpCode(201)
  CreateAlbum(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.favoritesService.createAlbum(id);
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.favoritesService.removeTrack(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.favoritesService.removeArtist(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.favoritesService.removeAlbum(id);
  }
}
