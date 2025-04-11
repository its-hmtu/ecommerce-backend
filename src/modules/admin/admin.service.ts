import { Injectable } from '@nestjs/common';
import { IAdminService } from './interfaces/admin-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { IAdmin } from './interfaces/admin.interface';

@Injectable()
export class AdminService implements IAdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
  ) {}

  async findById(id: number | string): Promise<IAdmin | null> {
    const admin = await this.adminRepo.findOne({
      where: { id: typeof id === 'string' ? parseInt(id, 10) : id },
    });

    if (!admin) {
      return null;
    }

    return admin;
  }

  async findByEmail(email: string): Promise<IAdmin | null> {
    const admin = await this.adminRepo.findOne({
      where: { email },
    });

    if (!admin) {
      return null;
    }

    return admin;
  }
}
