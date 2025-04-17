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
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { Role } from 'src/common/enums';

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
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<IApiResponse<LoginResponseDto>> {
    console.log(req.user);
    const isAdmin = req.user.role === 'admin';

    let result;
    if (isAdmin) {
      result = await this.authService.loginAsAdmin(req.user);
    } else {
      result = await this.authService.login(req.user);
    }

    return {
      success: true,
      message: 'Login successful',
      data: result,
    };
  }

  @ApiOperation({
    summary: 'Login as admin',
  })
  @ApiResponse({
    status: 200,
    description: 'Admin logged in successfully',
    type: LoginResponseDto,
  })
  @UseGuards(LocalAuthGuard)
  @Post('admin/login')
  async loginAsAdmin(@Request() req): Promise<IApiResponse<LoginResponseDto>> {
    const result = await this.authService.loginAsAdmin(req.user);
    return {
      success: true,
      message: 'Admin login successful',
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('profile')
  async getProfile(@Request() req): Promise<IApiResponse<any>> {
    // const user = await this.authService.getProfile(parseInt(req.user.id));
    console.log(req.user);
    const user = await this.authService.getAdminProfile(parseInt(req.user.id));
    return {
      success: true,
      message: 'User profile retrieved successfully',
      data: user,
    };
  }
}
