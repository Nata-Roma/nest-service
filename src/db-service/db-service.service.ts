import { DbFavorite } from './dbFavorite';
import { DbAlbum } from './dbAlbum';
import { DbTrack } from './dbTrack';
import { DbUser } from './dbUser';
import { Injectable } from '@nestjs/common';
import { DbArtist } from './dbArtist';

@Injectable()
export class DbServiceService {
  public user: DbUser = new DbUser();
  public artist: DbArtist = new DbArtist();
  public track: DbTrack = new DbTrack();
  public album: DbAlbum = new DbAlbum();
  public favorite: DbFavorite = new DbFavorite();
}
