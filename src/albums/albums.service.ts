import { Album } from './entities/album.entity';
import { Prisma } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    let data: Prisma.AlbumCreateInput = {
      name: createAlbumDto.name,
      year: createAlbumDto.year,
    };

    if (createAlbumDto.artistId) {
      data = {
        ...data,
        artist: {
          connect: { id: createAlbumDto.artistId },
        },
      };
    }
    const album = await this.prisma.album.create({
      data,
    });

    return new Album(album);
  }

  async findAll() {
    const albums = await this.prisma.album.findMany();
    return albums.map((item) => new Album(item));
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if(!album) {
      throw new NotFoundException(`Album id: '${id}' not found`);
    }
    
    return new Album(album);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    let data: Prisma.AlbumUpdateInput = {
      name: updateAlbumDto.name,
      year: updateAlbumDto.year,
    };
    if (updateAlbumDto.artistId) {
      data = {
        ...data,
        artist: {
          connect: { id: updateAlbumDto.artistId },
        },
      };
    }

    const album = await this.prisma.album.update({
      where: { id },
      data,
    });

    return new Album(album);
  }

  async remove(id: string) {
    const resp = await this.prisma.album.delete({
      where: { id },
    });
    return;
  }
}
