import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CommonMessages } from 'src/common/common-message';

@Controller('api/admin')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('/login')
    async login(@Body() body: any) {
        try {
            const response = await this.authService.signin(body);

            return {
                status: true,
                message: 'Login successful',
                data: response,
            };
        } catch (error) {
            return {
                status: false,
                message: error.message,
            };
        }
    }

    @Get('/profile')
    async profile(@Req() request: any) {
        try {

            const response = await this.authService.profile(
                request.user.userId,
            );

            return {
                status: true,
                message: 'Profile fetched successfully',
                data: response,
            };

        } catch (error) {

            return {
                status: false,
                message: error.message,
            };

        }
    }
    
}
