import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthGrpcController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @GrpcMethod('AuthService', 'Signup')
    async signup(data: any) {
        await this.authService.signup(data);
        return {
            status: true,
            message: 'signup successfully',
        }
    }

    @GrpcMethod('AuthService', 'Login')
    async login(data: any) {
        const user = await this.authService.login(data);
        return {
            status: true,
            message: 'login successfully',
            token: user.token,
            data: {
                id: user.id,
                first_name: user.first_name ?? '',
                last_name: user.last_name ?? '',
                firstName: user.first_name ?? '',
                lastName: user.last_name ?? '',
                email: user.email ?? '',
                role_id: user.role_id ?? 0,
                roleId: user.role_id ?? 0,
                is_active: user.is_active ?? false,
                isActive: user.is_active ?? false,
                image: user.image ?? '',
                phone: user.phone ?? '',
                dial_code: user.dial_code != null ? String(user.dial_code) : '',
                dialCode: user.dial_code != null ? String(user.dial_code) : '',
                createdAt: user.createdAt ? String(user.createdAt) : '',
                updatedAt: user.updatedAt ? String(user.updatedAt) : '',
            }
        }
    }

    @GrpcMethod('AuthService', 'Profile')
    async profile(data: any) {
        const user = await this.authService.profile(data.userId);

        return {
            status: true,
            message: 'Profile fetched successfully',
            data: {
                id: user.id,
                first_name: user.first_name ?? '',
                last_name: user.last_name ?? '',
                firstName: user.first_name ?? '',
                lastName: user.last_name ?? '',
                email: user.email ?? '',
                role_id: user.role_id ?? 0,
                roleId: user.role_id ?? 0,
                is_active: user.is_active ?? false,
                isActive: user.is_active ?? false,
                image: user.image ?? '',
                phone: user.phone ?? '',
                dial_code: user.dial_code != null ? String(user.dial_code) : '',
                dialCode: user.dial_code != null ? String(user.dial_code) : '',
                createdAt: user.createdAt ? String(user.createdAt) : '',
                updatedAt: user.updatedAt ? String(user.updatedAt) : '',
            },
        };
    }
}