import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserService } from './interfaces/user-service.interface';
import { CreateUserDto } from './dto';
import { IUser } from './interfaces/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto): Promise<IUser> {
    const newUser = this.userRepo.create(user);
    return await this.userRepo.save(newUser);
  }

  async findByEmail(email: string): Promise<IUser> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async findAll(): Promise<IUser[]> {
    const users = await this.userRepo.find();
    if (!users || users.length === 0) {
      throw new NotFoundException('No users found');
    }

    return users;
  }
}
