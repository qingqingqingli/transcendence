import {Body, Controller, Get, Param, Post, Query, Request} from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./models/user.entity";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async all(): Promise<User[]> {
    return await this.userService.all();
  }

  @Post()
  async create(@Body() data: any): Promise<User> {
    return await this.userService.create(data);
  }

  @Get("findName")
  async findUserName(@Query() query): Promise<User> {
    console.log(query);

    return await this.userService.findUserName(query);
  }
}
