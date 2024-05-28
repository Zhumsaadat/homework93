import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../Schemas/User.shema';
import { Model } from 'mongoose';
import { CreateUserDto } from './create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { TokenAuthGuard } from '../token-auth/token-auth.guard';

@Controller('users')
export class UsersController {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {}

    @Get()
    async getAll() {
        return this.userModel.find();
    }


    @Post()
    async registerUser (@Body() userDto: CreateUserDto){
        console.log(userDto)
        const user = await new this.userModel({
            email: userDto.email,
            password: userDto.password,
            displayName: userDto.displayName,
            role: 'listener'
        });

        await user.generateToken();
        console.log(user.email, user.role, user.token)
        return user.save();
    }

    @UseGuards(AuthGuard('local'))
    @Post('sessions')
    async login(@Req() req: Request) {
        return req.user;
    }

    @UseGuards(TokenAuthGuard)
    @Get('secret')
    async secret(@Req() req: Request) {
        return {message: 'Secret message'};
    }
}
