import { Controller, Get, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { IAdminService } from './interfaces/admin-service.interface';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get(':id')
  async getAdminById(@Param('id') id: string): Promise<any> {
    try {
      const admin = await this.adminService.getAdminById(id);
      return {
        success: true,
        message: 'Admin retrieved successfully',
        data: admin,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve admin',
        error: error.message,
      };
    }
  }
}
