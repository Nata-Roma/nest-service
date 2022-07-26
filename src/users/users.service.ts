import { LoginUserDto } from './dto/login-user.dto';
import { PrismaService } from './../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from './dto/update-password.dto';
import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
      },
    });

    return new User(user);
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map((item) => new User(item));
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException();

    return new User(user);
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const oldUser = await this.prisma.user.findUnique({ where: { id } });

    if (oldUser) {
      const match = bcrypt.compare(
        updatePasswordDto.oldPassword,
        oldUser.password,
      );
      //if (oldUser.password !== updatePasswordDto.oldPassword) {
      if (!match) {
        throw new ForbiddenException({
          status: HttpStatus.FORBIDDEN,
          message: 'Wrong credentials',
        });
      }
    }

    const newUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: await bcrypt.hash(updatePasswordDto.newPassword, 10),
        version: { increment: 1 },
      },
    });

    return new User(newUser);
  }

  async remove(id: string) {
    const resp = await this.prisma.user.delete({ where: { id } });

    return;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { login: loginUserDto.login },
    });

    if (user) {
      const match = bcrypt.compare(loginUserDto.password, user.password);
      if (!match) {
        throw new ForbiddenException({
          status: HttpStatus.FORBIDDEN,
          message: 'Wrong credentials',
        });
      }
    }
  }
}
