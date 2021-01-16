import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from 'src/modules/config/config.module';
import { ConfigService } from 'src/modules/config/config.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/modules/user/user.module';
import { UserService } from 'src/modules/user/user.service';
import { UserDAO } from 'src/entities/dao/user.dao';

import { S3Module } from 'src/modules/s3/s3.module';

import { AuthResolver } from './auth.resolver';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    TypeOrmModule.forFeature([UserDAO]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
      }),
    }),
    S3Module,
    MailerModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
