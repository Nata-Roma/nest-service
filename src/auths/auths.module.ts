import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { UsersModule } from './../users/users.module';

const jwtSecret = 'prismaSecret';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`,
        },
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_REFRESH_TOKEN_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`,
        },
      }),
    }),
    UsersModule,
  ],
  controllers: [AuthsController],
  providers: [AuthsService, JwtStrategy, JwtRefreshStrategy],
})
export class AuthsModule {}
