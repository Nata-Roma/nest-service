import { DbServiceService } from './../db-service/db-service.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(private dbService: DbServiceService) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.dbService.album.create(createAlbumDto);
  }

  findAll() {
    return this.dbService.album.findAll();
  }

  findOne(id: string) {
    const album = this.dbService.album.findOne(id);

    if (!Object.keys(album).length) throw new NotFoundException();

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const resp = this.dbService.album.update(id, updateAlbumDto);

    if (resp.status === 404) throw new NotFoundException();

    return resp.album;
  }

  remove(id: string) {
    const resp = this.dbService.album.remove(id);
    if (resp.status === 404) throw new NotFoundException();

    this.dbService.track.removeAlbumLink(id);
    this.dbService.favorite.removeAlbum(id);
    return;
  }
}
