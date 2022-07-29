import { JwtAuthGuard } from './../auths/jwt-auth.guard';
import { Controller, Get, Post, Body, Param, Delete, Header, HttpCode, Put, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  @Header('Content-Type', 'application/json')
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  findOne(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.artistsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @Header('Content-Type', 'application/json')
  update(@Param('id', new ParseUUIDPipe({version: '4'})) id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistsService.update(id, updateArtistDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  @Header('Content-Type', 'application/json')
  remove(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.artistsService.remove(id);
  }
}
