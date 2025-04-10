import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto';
import { IApiResponse } from 'src/common/interfaces/api-response.interface';
import { AuthGuard } from '@nestjs/passport';
import { LoginResponseDto } from './dto/login-response.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Register a new user',
  })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: CreateUserDto,
  })
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<IApiResponse<any>> {
    const result = await this.authService.register(createUserDto);
    return {
      success: true,
      message: 'User registered successfully',
      data: result,
    };
  }

  @ApiOperation({
    summary: 'Login a user',
  })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    type: LoginResponseDto,
  })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req): Promise<IApiResponse<LoginResponseDto>> {
    const result = await this.authService.login(req.user);
    return {
      success: true,
      message: 'Login successful',
      data: result,
    };
  }

  @ApiOperation({
    summary: 'Get user profile',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    type: UserResponseDto,
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req): Promise<IApiResponse<UserResponseDto>> {
    const user = await this.authService.getProfile(parseInt(req.user.id));
    return {
      success: true,
      message: 'User profile retrieved successfully',
      data: user,
    };
  }
}
