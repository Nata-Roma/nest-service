import { JwtAuthGuard } from 'src/auths/jwt-auth.guard';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, Header, UseInterceptors, ClassSerializerInterceptor, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  @Header('Content-Type', 'application/json')
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @Header('Content-Type', 'application/json')
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  update(@Param('id', new ParseUUIDPipe({version: '4'})) id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.usersService.update(id, updatePasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.usersService.remove(id);
  }
}
