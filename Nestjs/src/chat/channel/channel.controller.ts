import {BadRequestException, Body, Controller, Get, Param, Post, Query} from "@nestjs/common";
import { ChannelService } from "./channel.service";
import { Channel } from "./channel.entity";
import {User} from "../../user/models/user.entity";
import * as bcrypt from 'bcryptjs'


@Controller('channels/')
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  @Get()
  async all(@Query() query): Promise<Channel[]> {
    return this.channelService.getAll(query);
  }

  @Get('one')
  async one(@Query() query : any ) : Promise<Channel> {
    return this.channelService.one(query)
  }


  @Get('/channel-users')
  async getChannelUsers(@Query('id') id: any) {
    return await this.channelService.getChannelUsers(id);
  }

  @Get('/test')
  async gettest(@Query('id') userId: any) {
    return await this.channelService.test(userId);
  }


  @Post()
  async addOneChannel(
    @Body('Name') ChannelName:string,
    @Body("IsPrivate") Private:boolean,
    @Body('IsDirect') IsDirect:boolean,
    @Body("Users") Users: User[],
    @Body('ownerId') ownerId : number,
    @Body('Password') Password:string){
    const channel = new Channel();
    channel.ChannelName = ChannelName;
    channel.IsPrivate = Private;
    channel.ownerId = ownerId;
    channel.IsDirect = IsDirect;
    const hashed = await bcrypt.hash(Password, 12);
    channel.Password = hashed;
    const generatedID = await this.channelService.create(channel);
    if(!generatedID)
        return;
    else
    {
      // this.createChannelUser(generatedID.Id, ownerId);
        Users.forEach((user : User) => {
          this.createChannelUser(generatedID.Id, user.id);
      })
    }

    return {id: generatedID.Id}
  }

  @Post('/channel-user')
  async createChannelUser(channelId: number, userId : number)
{

    const channelUser = await this.channelService.getUserLink(channelId, userId);
    if (!channelUser) {
      const newUserChannel = await this.channelService.createChannelUser(channelId, userId);
      return newUserChannel;
    }
    return channelUser;
  }

  @Get("findName")
  async findUserName(@Query() query): Promise<Channel> {
    const res = await this.channelService.findChannelName(query)
    return res ;
  }

  @Post('remove')
  async removeUser(
      @Body('userId') userId: number,
      @Body('channelId') channelId: number)
  {
    await this.channelService.deleteChannelUser(userId, channelId);
  }


  @Post('login')
  async login(@Body('password') password: string,
              @Body('channelId') channelId: number,)
  {
    const channel : Channel = await this.channelService.login(channelId);
    if(!await bcrypt.compare(password, channel.Password)) {
      return false;
    }
    else
      return true;

  }
}
