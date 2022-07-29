import { RequestWithUser } from './requestWithUser.interface';
import { ExtractJwt } from 'passport-jwt';
import { JwtRefreshGuard } from './jwt-refresh.guard';
import { RefreshAuthDto } from './dto/refresh-auth.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthsService } from './auths.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Post('signup')
  @HttpCode(201)
  @Header('Content-Type', 'application/json')
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authsService.create(createAuthDto);
  }

  @HttpCode(200)
  @Post('login')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(ClassSerializerInterceptor)
  login(@Body() loginAuthDto: LoginAuthDto, @Req() request: any) {
    return this.authsService.login(loginAuthDto);
  }

  @HttpCode(200)
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(ClassSerializerInterceptor)
  refreshToken(
    @Req() req: RequestWithUser,
  ) {
    const user = req.user;
    return this.authsService.getTokens(user.id, user.login);
  }
}
