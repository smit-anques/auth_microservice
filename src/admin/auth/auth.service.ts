import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceTokens } from 'src/schema/device_token.schema';
import { User } from 'src/schema/user.schema';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenService } from 'src/authGuards/jwt.service';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(DeviceTokens)
        private readonly deviceTokenRepository: Repository<DeviceTokens>,
        private readonly jwtTokenService: JwtTokenService,
    ) { }

    async signin(body: {
        email: string;
        password: string;
        device_token?: string;
    }) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    email: body.email,
                },
            });

            if (!user) {
                throw new BadRequestException('Invalid email or password');
            }

            const isPasswordMatched = await bcrypt.compare(
                body.password,
                user.password!,
            );

            if (!isPasswordMatched) {
                throw new BadRequestException('Invalid email or password');
            }

            if (!user.is_active) {
                throw new BadRequestException('Your account is inactive');
            }

            const token = await this.jwtTokenService.generateToken({
                userId: user.id,
                email: user.email,
                role_id: user.role_id,
            });

            // Optional: Save device token
            if (body.device_token) {
                let device = await this.deviceTokenRepository.findOne({
                    where: {
                        user_id: user.id,
                    },
                });

                if (device) {
                    device.device_token = body.device_token;
                    await this.deviceTokenRepository.save(device);
                } else {
                    const newDevice = this.deviceTokenRepository.create({
                        user_id: user.id,
                        email: user.email,
                        device_token: body.device_token,
                    });

                    await this.deviceTokenRepository.save(newDevice);
                }
            }

            return {
                user,
                token,
            };
        } catch (error) {
            throw error;
        }
    }

    async profile(userId: number) {
        try {

            const user = await this.userRepository.findOne({
                where: {
                    id: userId,
                    role_id:1,
                },
            });

            if (!user) {
                throw new BadRequestException('User not found');
            }

            return user;

        } catch (error) {
            throw error;
        }
    }
}
