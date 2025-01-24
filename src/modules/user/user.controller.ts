import { Body, Controller, Delete, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiTags("Api")
    @ApiResponse({status: 200, type: UpdateUserDto})
    @UseGuards(JwtAuthGuard)
    @Patch()
    updateUser(@Body() updateDto: UpdateUserDto, @Req() req): Promise<UpdateUserDto> {
        const user = req.user;
        console.log(user);
        
        return this.userService.updateUser(user.email, updateDto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteUser(@Req() req) {
        const user = req.user
        return this.userService.deleteUser(user.email)
    }
    
}
