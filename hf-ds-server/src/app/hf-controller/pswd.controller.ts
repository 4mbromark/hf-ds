import { Body, Controller, Delete, Get, HttpStatus, Logger, Post, Res } from "@nestjs/common";
import { Response } from 'express';
import { Url } from './url/url';
import { Public } from './jwt/jwt-public';
import { UserControllerService } from '../hf-service/controller/user-controller.service';
import { HighFiveUser } from 'hf-ds-module';
import { Prefix } from "hf-logger-module";
import { PswdControllerService } from "../hf-service/controller/pswd-controller.service";
import { LoggedUser } from "./jwt/jwt-user";

@Controller(Url.BASE + '/pswd')
export class PswdController {
    private readonly logger = new Logger(PswdController.name);

    constructor(
        private pswdControllerService: PswdControllerService
    ) {}

    @Public()
    @Post()
    public async add(@Body() body: any, @Res() res: Response) {
        const { idUser, pswd } = body;

        await this.pswdControllerService.add(idUser, pswd);
        res.status(HttpStatus.OK).send();
        this.logger.log(Prefix.RESPONSE_SENT + idUser);
    }

    @Post('/change')
    public async change(@LoggedUser() u: HighFiveUser, @Body() body: any, @Res() res: Response) {
        const { oldPswd, newPswd } = body;

        await this.pswdControllerService.change(u.id, oldPswd, newPswd);
        res.status(HttpStatus.OK).send();
        this.logger.log(Prefix.RESPONSE_SENT + u.id);
    }
}