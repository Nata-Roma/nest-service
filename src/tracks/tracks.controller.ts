import { Controller, Get, Post, Body, Param, Delete, Header, Put, HttpCode, ParseUUIDPipe } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @HttpCode(201)
  @Header('Content-Type', 'application/json')
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  findAll() {
    console.log('TRACK');
    
    return this.tracksService.findAll();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  findOne(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.tracksService.findOne(id);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  update(@Param('id', new ParseUUIDPipe({version: '4'})) id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.tracksService.remove(id);
  }
}
