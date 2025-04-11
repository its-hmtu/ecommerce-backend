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
import { AdminService } from '../admin/admin.service';
import { IAdmin } from '../admin/interfaces/admin.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  private async findAdminByEmail(email: string): Promise<IAdmin | null> {
    try {
      const admin = await this.adminService.findByEmail(email);
      return admin;
    } catch (error) {
      return null;
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    try {
      // First try to find a user
      const user = await this.usersService.findByEmail(email);
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const { password: _, ...result } = user;
        return { ...result, role: 'user' }; // Add role for authorization
      }

      throw new UnauthorizedException('Invalid credentials');
    } catch (error) {
      // If no user found or password doesn't match, try admin
      try {
        // Get admin by email - you'll need to add this method to AdminService
        const admin = await this.findAdminByEmail(email);

        if (!admin) {
          throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = password === admin.password;

        if (isPasswordValid) {
          const { password: _, ...result } = admin;
          return { ...result, role: admin.role }; // Admin already has role field
        }

        throw new UnauthorizedException('Invalid credentials');
      } catch (adminError) {
        // Neither user nor admin matched
        throw new UnauthorizedException('Invalid credentials');
      }
    }
  }

  async login(user: IUser) {
    const payload = { email: user.email, sub: user.id, role: 'user' };
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

  async loginAsAdmin(user: IAdmin) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async getAdminProfile(userId: number | string): Promise<IAdmin> {
    try {
      const user = await this.adminService.findById(userId);
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
