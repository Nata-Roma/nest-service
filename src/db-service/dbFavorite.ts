import { Favorite } from './../favorites/entities/favorite.entity';

export class DbFavorite {
  private table: Favorite = new Favorite();

  createTrack(id: string) {
    const fieldFound = this.table.tracks[id];
    

    if (!fieldFound) {
      this.table.tracks.push(id);
    }

    return id;
  }

  createArtist(id: string) {
    const fieldFound = this.table.artists[id];

    if (!fieldFound) {
      this.table.artists.push(id);
    }

    return id;
  }

  createAlbum(id: string) {
    const fieldFound = this.table.albums[id];

    if (!fieldFound) {
      this.table.albums.push(id);
    }

    return id;
  }

  findAll() {
    return { ...this.table };
  }

  findOneTrack(id: string) {
    return (this.table.tracks.find((recordId) => recordId === id));
  }

  findOneArtist(id: string) {
    return this.table.artists.find((recordId) => recordId === id);
  }

  findOneAlbum(id: string) {
    return this.table.albums.find((recordId) => recordId === id);
  }

  removeTrack(id: string) {
    const recordFound = this.table.tracks.find((recordId) => recordId === id);
    if (!recordFound) {
      return { status: 404, message: 'Not found' };
    }

    this.table.tracks = this.table.tracks.filter((recordId) => recordId !== id);

    return { status: 204 };
  }

  removeArtist(id: string) {
    const recordFound = this.table.artists.find((recordId) => recordId === id);
    if (!recordFound) {
      return { status: 404, message: 'Not found' };
    }

    this.table.artists = this.table.artists.filter((recordId) => recordId !== id);

    return { status: 204 };
  }

  removeAlbum(id: string) {
    const recordFound = this.table.albums.find((recordId) => recordId === id);
    if (!recordFound) {
      return { status: 404, message: 'Not found' };
    }

    this.table.albums = this.table.albums.filter((recordId) => recordId !== id);

    return { status: 204 };
  }
}
