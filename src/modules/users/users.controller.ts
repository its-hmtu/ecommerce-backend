import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';
import { IApiResponse } from 'src/common/interfaces/api-response.interface';
import { plainToClass } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<IApiResponse<UserResponseDto>> {
    try {
      const user = await this.userService.createUser(createUserDto);
      return {
        success: true,
        message: 'User created successfully',
        data: plainToClass(UserResponseDto, user, {
          excludeExtraneousValues: true,
        }),
      };
    } catch (error) {
      return {
        success: false,
        message: 'User creation failed',
        error: error.message,
      };
    }
  }
}
