import { JwtAuthGuard } from './../auths/jwt-auth.guard';
import { Controller, Get, Post, Body, Param, Delete, Header, Put, HttpCode, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(201)
  @Header('Content-Type', 'application/json')
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @Header('Content-Type', 'application/json')
  findAll() {
    return this.tracksService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @Header('Content-Type', 'application/json')
  findOne(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.tracksService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @Header('Content-Type', 'application/json')
  update(@Param('id', new ParseUUIDPipe({version: '4'})) id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.tracksService.update(id, updateTrackDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.tracksService.remove(id);
  }
}
