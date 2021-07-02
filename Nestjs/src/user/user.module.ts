import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import { UserService } from './user.service';
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./auth/models/constants";
import { UploadController } from './upload/upload.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1d' },
        }),],
    controllers: [UserController, UploadController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
