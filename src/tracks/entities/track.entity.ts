import { Exclude } from "class-transformer";

export class Track {
  id: string; // uuid v4
  name: string;
  artistId: string;
  albumId: string;
  duration: number;

  @Exclude({ toPlainOnly: true })
  favoriteId: string;

  @Exclude({ toPlainOnly: true })
  favorite: {id: string};

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
