import { DbServiceService } from './../db-service/db-service.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private dbService: DbServiceService) {}

  create(createArtistDto: CreateArtistDto) {
    return this.dbService.artist.create(createArtistDto);
  }

  findAll() {
    return this.dbService.artist.findAll();
  }

  findOne(id: string) {
    const artist = this.dbService.artist.findOne(id);

    if (!Object.keys(artist).length) throw new NotFoundException();

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const resp = this.dbService.artist.update(id, updateArtistDto);

    if (resp.status === 404) throw new NotFoundException();

    return resp.artist;
  }

  remove(id: string) {
    const resp = this.dbService.artist.remove(id);
    if (resp.status === 404) throw new NotFoundException();

    this.dbService.track.removeArtistLink(id);
    this.dbService.album.removeArtistLink(id);
    this.dbService.favorite.removeArtist(id);
    return;
  }
}
