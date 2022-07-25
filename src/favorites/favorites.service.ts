import { Track } from './../tracks/entities/track.entity';
import { Artist } from './../artists/entities/artist.entity';
import { Album } from './../albums/entities/album.entity';
import { PrismaService } from './../prisma/prisma.service';
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class FavoritesService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async createTrack(id: string) {
    const item = await this.prisma.favorite.findMany();

    if (!item.length) {
      const newItem = await this.prisma.favorite.create({ data: {} });
      const newRelation = await this.prisma.track.update({
        where: { id },
        data: {
          favorite: {
            connect: {
              id: newItem.id,
            },
          },
        },
        include: {
          favorite: true,
        },
      });
      return newRelation;
    }

    const newRelation = await this.prisma.track.update({
      where: { id },
      data: {
        favorite: {
          connect: {
            id: item[0].id,
          },
        },
      },
      include: {
        favorite: true,
      },
    });
    //return newRelation;
    return { message: 'Record Id is added' };
  }

  async createArtist(id: string) {
    const item = await this.prisma.favorite.findMany();

    if (!item.length) {
      const newItem = await this.prisma.favorite.create({ data: {} });
      const newRelation = await this.prisma.artist.update({
        where: { id },
        data: {
          favorite: {
            connect: {
              id: newItem.id,
            },
          },
        },
        include: {
          favorite: true,
        },
      });
      //return newRelation;
      return { message: 'Record Id is added' };
    }

    const newRelation = await this.prisma.artist.update({
      where: { id },
      data: {
        favorite: {
          connect: {
            id: item[0].id,
          },
        },
      },
      include: {
        favorite: true,
      },
    });
    //return newRelation;
    return { message: 'Record Id is added' };
  }

  async createAlbum(id: string) {
    const item = await this.prisma.favorite.findMany();

    if (!item.length) {
      const newItem = await this.prisma.favorite.create({ data: {} });
      const newRelation = await this.prisma.album.update({
        where: { id },
        data: {
          favorite: {
            connect: {
              id: newItem.id,
            },
          },
        },
        include: {
          favorite: true,
        },
      });
      //return newRelation;
      return { message: 'Record Id is added' };
    }

    const newRelation = await this.prisma.album.update({
      where: { id },
      data: {
        favorite: {
          connect: {
            id: item[0].id,
          },
        },
      },
      include: {
        favorite: true,
      },
    });
    //return newRelation;
    return { message: 'Record Id is added' };
  }

  async findAll() {
    const item = await this.prisma.favorite.findMany();

    if (!item.length) {
      return [];
    }

    const albums = await this.prisma.album.findMany({
      where: {
        favoriteId: item[0].id,
      },
    });

    const artists = await this.prisma.artist.findMany({
      where: {
        favoriteId: item[0].id,
      },
    });

    const tracks = await this.prisma.track.findMany({
      where: {
        favoriteId: item[0].id,
      },
    });

    const payload = {
      albums: albums.map((album) => new Album(album)),
      artists: artists.map((artist) => new Artist(artist)),
      tracks: tracks.map((track) => new Track(track)),
    };
    return payload;
  }

  async removeTrack(id: string) {
    const item = await this.prisma.favorite.findMany();
    if (!item.length) {
      throw new NotFoundException();
    }

    const resp = await this.prisma.track.update({
      where: { id },
      data: {
        favoriteId: null,
      },
    });
    return;
  }

  async removeArtist(id: string) {
    const item = await this.prisma.favorite.findMany();
    if (!item.length) {
      throw new NotFoundException();
    }

    const resp = await this.prisma.artist.update({
      where: { id },
      data: {
        favoriteId: null,
      },
    });
    return;
  }

  async removeAlbum(id: string) {
    const item = await this.prisma.favorite.findMany();
    if (!item.length) {
      throw new NotFoundException();
    }

    const resp = await this.prisma.album.update({
      where: { id },
      data: {
        favoriteId: null,
      },
    });
    return;
  }
}
