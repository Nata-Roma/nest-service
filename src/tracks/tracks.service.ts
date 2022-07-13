import { DbServiceService } from './../db-service/db-service.service';
import {  Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(private dbService: DbServiceService) {}
  
  create(createTrackDto: CreateTrackDto) {
    return this.dbService.track.create(createTrackDto);
  }

  findAll() {
    return this.dbService.track.findAll();
  }

  findOne(id: string) {
    const track = this.dbService.track.findOne(id);

    if (!Object.keys(track).length) throw new NotFoundException();

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const resp = this.dbService.track.update(id, updateTrackDto);

    if (resp.status === 404) throw new NotFoundException();

    return resp.track;
  }

  remove(id: string) {
    const resp = this.dbService.track.remove(id);
    if (resp.status === 404) throw new NotFoundException();

    return
  }
}
