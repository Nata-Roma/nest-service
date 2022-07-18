import { Exclude } from "class-transformer";

export class Artist {
    id: string; // uuid v4
    name: string;
    grammy: boolean;

    @Exclude({ toPlainOnly: true })
    favoriteId: string;
  
    @Exclude({ toPlainOnly: true })
    favorite: {id: string};

    constructor(partial: Partial<Artist>) {
      Object.assign(this, partial);
    }
  }
  