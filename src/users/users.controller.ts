import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../Schemas/User.shema';
import { Model } from 'mongoose';
import { CreateUserDto } from './create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { TokenAuthGuard } from '../token-auth/token-auth.guard';
import { PermitGuard} from '../permit-auth/permit-auth.guard';

@Controller('users')
export class UsersController {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {}

    @Post()
    async registerUser (@Body() userDto: CreateUserDto){
        const user = await new this.userModel({
            email: userDto.email,
            password: userDto.password,
            displayName: userDto.displayName,
            role: 'listener'
        });

        await user.generateToken();
        return user.save();
    }

    @UseGuards(AuthGuard('local'))
    @Post('sessions')
    async login(@Req() req: Request) {
        return req.user;
    }

    @UseGuards(TokenAuthGuard, new PermitGuard('admin'))
    @Get('secret')
    async secret(@Req() req: Request) {
        return {message: 'Secret message'};
    }
}
