export class Album {
  id: string;
  name: string;
  year: number;
  artistId: string;

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}
