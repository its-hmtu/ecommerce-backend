import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';
import { IApiResponse } from 'src/common/interfaces/api-response.interface';
import { plainToClass } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IUserService } from './interfaces/user-service.interface';
import { toDto } from 'src/utils/transform-to-dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserResponseDto,
  })
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<IApiResponse<UserResponseDto>> {
    const user = await this.userService.createUser(createUserDto);

    return {
      success: true,
      message: 'User created successfully',
      data: plainToClass(UserResponseDto, user, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Get one or all users using query params',
  })
  @ApiResponse({
    status: 200,
    description: 'Users found',
    type: UserResponseDto,
    isArray: true,
  })
  async getUsers(
    @Query('email') email?: string,
  ): Promise<IApiResponse<UserResponseDto[] | UserResponseDto>> {
    let users;
    if (email) {
      users = await this.userService.findByEmail(email);
      return {
        success: true,
        message: 'User found',
        data: toDto(UserResponseDto, users),
      };
    } else {
      users = await this.userService.findAll();
      return {
        success: true,
        message: 'Users found',
        data: users.map(
          (user: any): UserResponseDto => toDto(UserResponseDto, user), // Type assertion to any to avoid type errors
        ),
      };
    }
  }
}
