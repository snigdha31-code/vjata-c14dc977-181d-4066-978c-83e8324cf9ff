import { Injectable, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Role } from './roles.enum';

// AUTH SERVICE VALIDATES USERS AND ISSUES JWT TOKENS

interface HardcodedUser {
  id: number;
  email: string;
  password: string;
  role: Role;
}

@Injectable()
export class AuthService {
  private readonly hardcodedUsers: HardcodedUser[] = [
    { id: 1, email: 'test@example.com', password: '123456', role: Role.OWNER },
    { id: 2, email: 'admin@example.com', password: 'adminpass', role: Role.ADMIN },
    { id: 3, email: 'viewer@example.com', password: 'viewerpass', role: Role.VIEWER },
  ];

  constructor(
  private readonly jwtService: JwtService,
  @InjectRepository(User)
  private readonly userRepo: Repository<User>,
) {}
  async validateUser(email: string, password: string) {
  const hardcoded = this.hardcodedUsers.find(u => u.email === email);
  if (!hardcoded || hardcoded.password !== password) {
    throw new UnauthorizedException('Invalid credentials');
  }

  let user = await this.userRepo.findOne({ where: { email } });

  if (!user) {
    user = this.userRepo.create({
      email: hardcoded.email,
      password: hardcoded.password, 
      role: hardcoded.role,
    });
    user = await this.userRepo.save(user);
  }

  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
  };

  return {
    accessToken: this.jwtService.sign(payload),
    user,
  };
}

}
