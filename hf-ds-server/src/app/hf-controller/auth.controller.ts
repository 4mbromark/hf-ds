import { HighFiveControllerUtil } from 'hf-common-module';
import { AuthenticationControllerService } from './../hf-service/controller/auth-controller.service';
import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Logger, Post, Res } from "@nestjs/common";
import { Response } from 'express';
import { AppPermit } from '../app-permit';
import { Permit } from './jwt/jwt-permit';
import { HighFiveObjectUtil } from 'hf-common-module';
import { HighFiveStandardLog, HighFiveStandardLogPrefix } from 'hf-logger-module';

@Controller('/auth')
export class AuthenticationController {
    private readonly logger = new Logger(AuthenticationController.name);

    constructor(
        private readonly authControllerService: AuthenticationControllerService
    ) {}

    @Post()
    @Permit(AppPermit.APP_CAN_AUTH)
    public async login(@Body() body: any, @Res() res: Response) {
        this.logger.log('login > New Request');
        const { uid, pswd } = body;

        try {
            if (HighFiveObjectUtil.isNullOrEmpty(uid)) {
                throw new BadRequestException('uid is required for authentication');
            }
    
            if (HighFiveObjectUtil.isNullOrEmpty(pswd)) {
                throw new BadRequestException('pswd is required for authentication');
            }

            const tk = await this.authControllerService.authenticate(uid, pswd);
            const message = 'login > Response sent';
            HighFiveControllerUtil.manageResponseOrFail(tk, res, this.logger, message);
        } catch (e) {
            if (e instanceof HttpException) throw e;
            const message = 'login > Error response sent';
            HighFiveControllerUtil.manageUnhandledException(e, res, this.logger, message);
        }
    }

    @Post('/verify')
    @Permit(AppPermit.APP_CAN_AUTH)
    public async verify(@Body() body: any, @Res() res: Response) {
        this.logger.log('verify > New Request');
        const { tk } = body;

        try {
            if (HighFiveObjectUtil.isNullOrEmpty(tk)) {
                throw new BadRequestException('provided token is null or not valid');
            }

            const user = await this.authControllerService.verify(tk);
            const message = 'verify > Response sent';
            HighFiveControllerUtil.manageResponseOrFail(user, res, this.logger, message);
        } catch(e) {
            if (e instanceof HttpException) throw e;
            const message = 'verify > Error response sent';
            HighFiveControllerUtil.manageUnhandledException(e, res, this.logger, message);
        }
    }
}