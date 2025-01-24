import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../user/dto';
import { UserLoginDto } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUserResponse } from './response';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiTags('API')
    @ApiResponse({status: 201, type: CreateUserDTO})
    @HttpCode(201)
    @Post('register')
    register(@Body() dto: CreateUserDTO){
        return this.authService.registerUsers(dto)
    }

    @ApiTags('API')
    @ApiResponse({status: 200, type: AuthUserResponse})
    @HttpCode(200)
    @Post('login')
    login(@Body() dto: UserLoginDto): Promise<AuthUserResponse>{
        return this.authService.loginUser(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('test')
    test () {
        return true
    }
}
