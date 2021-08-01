import { Body, Controller, Delete, Get, HttpStatus, Logger, Post, Res } from "@nestjs/common";
import { Response } from 'express';
import { Url } from './url/url';
import { LoggedUser } from './jwt/jwt-user';
import { Public } from './jwt/jwt-public';
import { UserControllerService } from '../hf-service/controller/user-controller.service';
import { HighFiveUser } from 'hf-ds-module';
import { Prefix } from "hf-logger-module";

@Controller(Url.BASE + '/user')
export class UserController {
    private readonly logger = new Logger(UserController.name);

    constructor(
        private userControllerService: UserControllerService
    ) {}

    @Public()
    @Post('/exists')
    public async exists(@Body() body: any, @Res() res: Response) {
        const { uid } = body;

        const user = await this.userControllerService.exists(uid);
        if (user) {
            res.status(HttpStatus.OK).send(user);
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
        this.logger.log(Prefix.RESPONSE_SENT + user.id + ' - ' + user.username);
    }

    @Public()
    @Post()
    public async create(@Body() body: any, @Res() res: Response) {
        const { user } = body;

        const newUser = await this.userControllerService.create(user);
        if (newUser) {
            res.status(HttpStatus.OK).send(newUser.id);
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
        this.logger.log(Prefix.RESPONSE_SENT + user.id + ' - ' + user.username);
    }

    @Get()
    public async get(@LoggedUser() u: HighFiveUser, @Res() res: Response) {
        const user = await this.userControllerService.getById(u.id);
        if (user) {
            res.status(HttpStatus.OK).send(user);
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
        this.logger.log(Prefix.RESPONSE_SENT + user.id + ' - ' + user.username);
    }

    /* @Delete()
    public async delete(@LoggedUser() u: HighFiveUser, @Res() res: Response) {
        await this.userControllerService.delete(u.id);
        res.status(HttpStatus.OK).send();
        this.logger.log(Prefix.RESPONSE_SENT + u.id);
    } */
}