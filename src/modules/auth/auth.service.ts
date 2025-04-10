import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../users/dto';
import { IUser } from '../users/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...result } = user;
    return result;
  }

  async login(user: IUser) {
    const payload = { email: user.email, sub: user.id };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.usersService.findByEmail(
        createUserDto.email,
      );
      // If we get here, a user with this email exists
      if (existingUser) {
        throw new NotFoundException('Email already in use');
      }
    } catch (error) {
      // If the error is a NotFoundException, it means the email is available
      if (!(error instanceof NotFoundException)) {
        throw error; // If it's another type of error, rethrow it
      }

      // Proceed with user creation
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
      const newUser = await this.usersService.createUser({
        ...createUserDto,
        password: hashedPassword,
      });

      const { password: _, ...result } = newUser;
      return result;
    }
  }

  async getProfile(userId: number | string): Promise<IUser> {
    try {
      const user = await this.usersService.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // If it's a NotFoundException, rethrow it
      } else {
        throw new NotFoundException('User not found');
      }
    }
  }
}
