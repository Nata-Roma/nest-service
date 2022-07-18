import { Track } from './entities/track.entity';
import { Prisma } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    let data: Prisma.TrackCreateInput = {
      name: createTrackDto.name,
      duration: createTrackDto.duration,
    };

    if (createTrackDto.artistId) {
      data = {
        ...data,
        artist: {
          connect: { id: createTrackDto.artistId },
        },
      };
    }

    if (createTrackDto.albumId) {
      data = {
        ...data,
        album: {
          connect: { id: createTrackDto.albumId },
        },
      };
    }

    const track = await this.prisma.track.create({
      data,
    });

    return new Track(track);
  }

  async findAll() {
    const tracks = await this.prisma.track.findMany();

    return tracks.map((track) => new Track(track));
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    return new Track(track);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    let data: Prisma.TrackUpdateInput = {
      name: updateTrackDto.name,
      duration: updateTrackDto.duration,
    };

    if (updateTrackDto.artistId) {
      data = {
        ...data,
        artist: {
          connect: { id: updateTrackDto.artistId },
        },
      };
    }

    if (updateTrackDto.albumId) {
      data = {
        ...data,
        album: {
          connect: { id: updateTrackDto.albumId },
        },
      };
    }

    const track = await this.prisma.track.update({
      where: { id },
      data,
    });

    return new Track(track);
  }

  async remove(id: string) {
    const resp = await this.prisma.track.delete({ where: { id } });

    return;
  }
}
