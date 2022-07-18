import { Exclude } from "class-transformer";

export class Album {
  id: string;
  name: string;
  year: number;
  artistId: string;

  @Exclude({ toPlainOnly: true })
  favoriteId: string;

  @Exclude({ toPlainOnly: true })
  favorite: {id: string};

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}
