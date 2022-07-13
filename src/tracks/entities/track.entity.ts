export class Track {
  id: string; // uuid v4
  name: string;
  artistId: string;
  albumId: string;
  duration: number;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
