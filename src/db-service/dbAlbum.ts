import { UpdateAlbumDto } from './../albums/dto/update-album.dto';
import { CreateAlbumDto } from './../albums/dto/create-album.dto';
import { Album } from './../albums/entities/album.entity';
import { v4 as uuidv4 } from 'uuid';

export class DbAlbum {
  private table: Array<Album> = [];

  create(data: CreateAlbumDto) {
    const newAlbum = new Album({
      id: uuidv4(),
      name: data.name,
      year: data.year,
      artistId: data.artistId ? data.artistId : null,
    });
    this.table.push(newAlbum);

    return newAlbum;
  }

  findAll() {
    return this.table.map((item) => new Album(item));
  }

  findOne(id: string) {
    return new Album(this.table.find((item) => item.id === id));
  }

  update(id: string, data: UpdateAlbumDto) {
    const albumIndex = this.table.findIndex((album) => album.id === id);
    if (albumIndex < 0) return { status: 404, message: 'Not found' };
    const album = this.table[albumIndex];

    const newAlbum = {
      ...album,
    };

    if (data.name) {
      newAlbum.name = data.name;
    }
    if (data.year) {
      newAlbum.year = data.year;
    }

    if (data.artistId) {
      newAlbum.artistId = data.artistId;
    }

    const resultAlbum = new Album(newAlbum)

    this.table[albumIndex] = resultAlbum;
    return { status: 200, album: resultAlbum };
  }

  remove(id: string) {
    const newAlbum = this.table.findIndex((album) => album.id === id);
    if (newAlbum < 0) return { status: 404, message: 'Not found' };
    this.table = this.table.filter((item) => item.id !== id);

    return { status: 204 };
  }

  removeArtistLink(artistId: string) {
    this.table.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }
}
