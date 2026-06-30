import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(
    payload: any,
    expiresIn?: JwtSignOptions['expiresIn'],
  ): Promise<string> {
    return this.jwtService.signAsync(payload, expiresIn ? { expiresIn } : {});
  }

  async verifyToken(token: string) {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}