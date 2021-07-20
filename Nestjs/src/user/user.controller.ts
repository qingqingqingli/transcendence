import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./models/user.entity";
import { AuthService } from "./auth/auth.service";
import { Request } from "express";
import { verifyUser } from "./auth/strategy/auth.guard";
import {Channel} from "../chat/channel/channel.entity";

@Controller("users")
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Get()
  async all(): Promise<User[]> {
    return this.userService.all();
  }

  @Get("findName")
  async findUserName(@Query() query): Promise<User> {
    return await this.userService.findUserName(query);
  }

  @UseGuards(verifyUser)
  @Get("getActiveUserID")
  async getActiveUserID(@Req() request: Request) {
    const id = await this.authService.clientID(request);
    return { activeUserID: id };
  }

  @Get('channels')
  async getChannels(@Query() query : number) : Promise<Channel[]>
  {
    console.log(query);
    const data : any =  await this.userService.channels(query);
    // console.log(data.channels);
    let res : Channel[] = data.channels;
    return(res);
  }
}

