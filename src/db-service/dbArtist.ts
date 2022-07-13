import { UpdateArtistDto } from './../artists/dto/update-artist.dto';
import { CreateArtistDto } from './../artists/dto/create-artist.dto';
import { Artist } from './../artists/entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';

export class DbArtist {
  private table: Array<Artist> = [];

  create(data: CreateArtistDto) {
    const newArtist = new Artist({
      id: uuidv4(),
      name: data.name,
      grammy: data.grammy,
    });
    this.table.push(newArtist);

    return newArtist;
  }

  findAll() {
    return this.table.map((item) => new Artist(item));
  }

  findOne(id: string) {
    return new Artist(this.table.find((item) => item.id === id));
  }

  update(id: string, data: UpdateArtistDto) {
    const artistIndex = this.table.findIndex((artist) => artist.id === id);
    if (artistIndex < 0) return { status: 404, message: 'Not found' };
    const artist = this.table[artistIndex];

    const newArtist = new Artist({
      ...artist,
      name: data.name,
      grammy: data.grammy,
    });
    this.table[artistIndex] = newArtist;
    return { status: 200, artist: newArtist };
  }

  remove(id: string) {
    const newArtist = this.table.findIndex((artist) => artist.id === id);
    if (newArtist < 0) return { status: 404, message: 'Not found' };
    this.table = this.table.filter((item) => item.id !== id);

    return { status: 204 };
  }
}
