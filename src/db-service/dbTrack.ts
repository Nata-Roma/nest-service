import { UpdateTrackDto } from './../tracks/dto/update-track.dto';
import { CreateTrackDto } from './../tracks/dto/create-track.dto';
import { Track } from './../tracks/entities/track.entity';
import { v4 as uuidv4 } from 'uuid';

export class DbTrack {
  private table: Array<Track> = [];

  create(data: CreateTrackDto) {
    const newTrack = new Track({
      id: uuidv4(),
      name: data.name,
      duration: data.duration,
      artistId: data.artistId ? data.artistId : null,
      albumId: data.albumId ? data.albumId : null,
    });
    this.table.push(newTrack);

    return newTrack;
  }

  findAll() {
    return this.table.map((item) => new Track(item));
  }

  findOne(id: string) {
    return new Track(this.table.find((item) => item.id === id));
  }

  update(id: string, data: UpdateTrackDto) {
    const trackIndex = this.table.findIndex((track) => track.id === id);
    if (trackIndex < 0) return { status: 404, message: 'Not found' };
    const track = this.table[trackIndex];

    const newTrack = {
      ...track,
    };

    if (data.name) {
      newTrack.name = data.name;
    }
    if (data.duration) {
      newTrack.duration = data.duration;
    }

    if (data.artistId) {
      newTrack.artistId = data.artistId;
    }

    if (data.albumId) {
      newTrack.albumId = data.albumId;
    }

    const resultTrack = new Track(newTrack);

    this.table[trackIndex] = resultTrack;
    return { status: 200, track: resultTrack };
  }

  remove(id: string) {
    const newTrack = this.table.findIndex((track) => track.id === id);
    if (newTrack < 0) return { status: 404, message: 'Not found' };
    this.table = this.table.filter((item) => item.id !== id);
    return { status: 204 };
  }

  removeArtistLink(artistId: string) {
    this.table.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }

  removeAlbumLink(albumId: string) {
    this.table.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }
}
