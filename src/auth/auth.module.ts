import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { User } from 'src/schema/user.schema';
import { DeviceTokens } from 'src/schema/device_token.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StringValue } from 'ms';
import { JwtTokenService } from 'src/authGuards/jwt.service';
import { AuthGrpcController } from './auth.grpc.controller';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, DeviceTokens]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController, AuthGrpcController],
  providers: [
    AuthService,
    JwtTokenService,
  ],
  exports: [
    AuthService,
    JwtTokenService,
  ],
})
export class AuthModule { }
