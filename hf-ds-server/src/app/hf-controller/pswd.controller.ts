import { Body, Controller, Delete, Get, HttpStatus, Logger, Post, Res } from "@nestjs/common";
import { Response } from 'express';
import { Token } from './jwt/jwt-public';
import { HighFiveStandardLogPrefix } from "hf-logger-module";
import { PswdControllerService } from "../hf-service/controller/pswd-controller.service";
import { LoggedUser } from "./jwt/jwt-user";
import { Permit } from "./jwt/jwt-permit";
import { AppPermit } from "../app-permit";
import { HighFiveUser } from "hf-ds-module";

@Controller('/pswd')
export class PswdController {
    private readonly logger = new Logger(PswdController.name);

    constructor(
        private readonly pswdControllerService: PswdControllerService
    ) {}

    @Post()
    @Permit(AppPermit.TOKEN_CAN_WRITE)
    public async add(@Body() body: any, @Res() res: Response) {
        const { idUser, pswd } = body;

        await this.pswdControllerService.add(idUser, pswd);
        res.status(HttpStatus.OK).send();
        this.logger.log(HighFiveStandardLogPrefix.RESPONSE_SENT + idUser);
    }

    @Post('/change')
    @Permit(AppPermit.TOKEN_CAN_WRITE)
    @Token()
    public async change(@LoggedUser() u: HighFiveUser, @Body() body: any, @Res() res: Response) {
        const { oldPswd, newPswd } = body;

        await this.pswdControllerService.change(u.id, oldPswd, newPswd);
        res.status(HttpStatus.OK).send();
        this.logger.log(HighFiveStandardLogPrefix.RESPONSE_SENT + u.id);
    }
}