import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { AuthService } from "../user/auth/auth.service";
import { Request } from "express";
import { verifyUser } from "../user/auth/strategy/auth.guard";
import { newGameDto } from "./models/newGame.dto";
import { GameService } from "./game.service";
import { gameStatsDto } from "./models/gameStats.dto";


@Controller()
export class GameController {
    constructor(
        private gameService: GameService,
        private userService: UserService,
        private authService: AuthService
    ) {}


    @UseGuards(verifyUser)
    @Get('gameData')
    async gameData (@Req() request: Request, @Body() gameID) : Promise<any> {
        return this.gameService.findOne(gameID);
    }

    @UseGuards(verifyUser)
    @Post('newGame')
    async newGame (@Req() request: Request, @Body() data: newGameDto) : Promise<any> {
        return this.gameService.create(data);
    }

    @UseGuards(verifyUser)
    @Post('updateGameStats')
    async updateGameStats (@Req() request: Request, @Body() data: gameStatsDto) : Promise<any> {
        return this.gameService.update(data.gameID, data);
    }
}