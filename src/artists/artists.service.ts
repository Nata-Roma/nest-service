import { Artist } from './entities/artist.entity';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    const artist = await this.prisma.artist.create({
      data: createArtistDto,
    });

    return new Artist(artist);
  }

  async findAll() {
    const artists = await this.prisma.artist.findMany();
    return artists.map((item) => new Artist(item));
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if(!artist) {
      throw new NotFoundException(`Artist id: '${id}' not found`);
    }

    return new Artist(artist);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.prisma.artist.update({
      where: { id },
      data: updateArtistDto,
    });

    return new Artist(artist);
  }

  async remove(id: string) {
    const resp = await this.prisma.artist.delete({ where: { id } });
    return;
  }
}
