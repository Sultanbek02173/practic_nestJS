import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDTO } from '../user/dto';
import { AppError } from 'src/common/constants/errors';
import { UserLoginDto } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService
    ) {}

    async registerUsers(dto: CreateUserDTO): Promise<CreateUserDTO>{
        const existUser = await this.userService.findUserByEmail(dto.email);

        if(existUser) throw new BadRequestException(AppError.USER_EXIST);
        return this.userService.createUser(dto);
    }

    async loginUser(dto: UserLoginDto): Promise<AuthUserResponse>{
        const existUser = await this.userService.findUserByEmail(dto.email)
        if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);
        const validatPassword = await bcrypt.compare(dto.password, existUser.password);
        if (!validatPassword) throw new BadRequestException(AppError.WRONG_DATA);
        const userData = {
            name: existUser.firstName,
            email: existUser.email
        }
        const token = await this.tokenService.generateJwtToken(dto.email);   
        const user = await this.userService.publicUser(dto.email);      
        return {...user, token};
    }
}
