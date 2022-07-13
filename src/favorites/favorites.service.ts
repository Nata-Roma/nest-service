import { DbServiceService } from './../db-service/db-service.service';
import {
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class FavoritesService {
  constructor(private dbService: DbServiceService) {}

  createTrack(id: string) {
    const findRecord = this.dbService.track.findOne(id);

    if (!Object.keys(findRecord).length) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Record Id is not found',
      });
    }

    const resp = this.dbService.favorite.createTrack(id);

    return { message: 'Record Id is added' };
  }

  createArtist(id: string) {
    const findRecord = this.dbService.artist.findOne(id);

    if (!Object.keys(findRecord).length) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Record Id is not found',
      });
    }

    const resp = this.dbService.favorite.createArtist(id);

    return { message: 'Record Id is added' };
  }

  createAlbum(id: string) {
    const findRecord = this.dbService.album.findOne(id);

    if (!Object.keys(findRecord).length) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Record Id is not found',
      });
    }

    const resp = this.dbService.favorite.createAlbum(id);

    return { message: 'Record Id is added' };
  }

  findAll() {
    const table = this.dbService.favorite.findAll();
    const keys = Object.keys(table);

    const payload = keys.reduce((acc, key) => {
      acc[key] = table[key].map((id: string) => {
        if (key === 'tracks') {
          return this.dbService.track.findOne(id);
        } else if (key === 'artists') {
          return this.dbService.artist.findOne(id);
        } else if (key === 'albums') {
          return this.dbService.album.findOne(id);
        }
      });

      return acc;
    }, {});

    return payload;
  }

  removeTrack(id: string) {
    const resp = this.dbService.favorite.removeTrack(id);
    console.log(resp);
    if (resp.status === 404) throw new NotFoundException();

    return;
  }

  removeArtist(id: string) {
    const resp = this.dbService.favorite.removeArtist(id);
    console.log(resp);
    if (resp.status === 404) throw new NotFoundException();

    return;
  }

  removeAlbum(id: string) {
    const resp = this.dbService.favorite.removeAlbum(id);
    console.log(resp);
    if (resp.status === 404) throw new NotFoundException();

    return;
  }
}
