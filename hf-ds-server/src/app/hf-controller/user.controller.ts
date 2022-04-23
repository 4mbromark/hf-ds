import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Post, Res, UnauthorizedException } from "@nestjs/common";
import { Response } from 'express';
import { Token } from './jwt/jwt-public';
import { UserControllerService } from '../hf-service/controller/user-controller.service';
import { LoggedUser } from "./jwt/jwt-user";
import { AppPermit } from "../app-permit";
import { Permit } from "./jwt/jwt-permit";
import { HighFiveUser } from "hf-ds-module";
import { HighFiveControllerUtil, HighFiveObjectUtil } from "hf-common-module";
import { HighFiveStandardLog, HighFiveStandardLogPrefix } from "hf-logger-module";

@Controller('/user')
export class UserController {
    private readonly logger = new Logger(UserController.name);

    constructor(
        private readonly userControllerService: UserControllerService
    ) {}

    @Post('/exists')
    @Permit(AppPermit.APP_CAN_AUTH)
    public async exists(@Body() body: any, @Res() res: Response) {
        this.logger.log('exists > New Request');
        const { uid } = body;
 
        try {
            if (HighFiveObjectUtil.isNullOrEmpty(uid)) {
                throw new BadRequestException('provided uid is null or not valid');
            }

            const user = await this.userControllerService.exists(uid);
            const message = 'exists > Response sent';
            HighFiveControllerUtil.manageResponseOrFail(user.id, res, this.logger, message);
        } catch (e) {
            if (e instanceof HttpException) throw e;
            const message = 'exists > Error response sent';
            HighFiveControllerUtil.manageUnhandledException(e, res, this.logger, message);
        } 
    }

    @Post()
    @Permit(AppPermit.APP_CAN_CREATE)
    public async create(@Body() body: any, @Res() res: Response) {
        this.logger.log('create > New Request');
        const { user } = body;

        try {
            const newUser = await this.userControllerService.create(user);
            const message = 'create > Response sent';
            HighFiveControllerUtil.manageResponseOrFail(newUser, res, this.logger, message);
        } catch (e) {
            if (e instanceof HttpException) throw e;
            const message = 'create > Error response sent';
            HighFiveControllerUtil.manageUnhandledException(e, res, this.logger, message);
        }
    }

    @Get()
    @Permit(AppPermit.TOKEN_CAN_READ)
    @Token()
    public async get(@LoggedUser() u: HighFiveUser, @Res() res: Response) {
        this.logger.log('get > New Request');

        try {
            if (HighFiveObjectUtil.isNull(u)) {
                throw new UnauthorizedException();
            }

            const user = await this.userControllerService.getById(u.id);
            const message = 'get > Response sent';
            HighFiveControllerUtil.manageResponseOrFail(user, res, this.logger, message);
        } catch (e) {
            if (e instanceof HttpException) throw e;
            const message = 'get > Error response sent';
            HighFiveControllerUtil.manageUnhandledException(e, res, this.logger, message);
        }
    }

    @Get('/:id')
    @Permit(AppPermit.TOKEN_CAN_READ_ALL)
    @Token()
    public async getById(@LoggedUser() u: HighFiveUser, @Param('id') id: number, @Res() res: Response) {
        this.logger.log('getById > New Request');

        try {
            if (HighFiveObjectUtil.isNull(u)) {
                throw new UnauthorizedException();
            }

            if (HighFiveObjectUtil.isNull(id) || HighFiveObjectUtil.isNotNumber(id)) {
                throw new BadRequestException('user id is null or not valid');
            }

            const user = await this.userControllerService.getById(id);
            const message = 'getById > Response sent';
            HighFiveControllerUtil.manageResponseOrFail(user, res, this.logger, message);
        } catch (e) {
            if (e instanceof HttpException) throw e;
            const message = 'getById > Error response sent';
            HighFiveControllerUtil.manageUnhandledException(e, res, this.logger, message);
        }
    }

    @Delete()
    @Permit(AppPermit.TOKEN_CAN_WRITE)
    @Token()
    public async delete(@LoggedUser() u: HighFiveUser, @Res() res: Response) {
        this.logger.log('delete > New Request');

        try {
            if (HighFiveObjectUtil.isNull(u)) {
                throw new UnauthorizedException();
            }

            await this.userControllerService.delete(u.id);
            const message = 'delete > Response sent';
            HighFiveControllerUtil.manageEmptyResponse(res, this.logger, message);
        } catch (e) {
            if (e instanceof HttpException) throw e;
            const message = 'delete > Error response sent';
            HighFiveControllerUtil.manageUnhandledException(e, res, this.logger, message);
        }
    } 

    @Delete('/:id')
    @Permit(AppPermit.TOKEN_CAN_WRITE_ALL)
    @Token()
    public async deleteById(@LoggedUser() u: HighFiveUser, @Param('id') id: number, @Res() res: Response) {
        this.logger.log('deleteById > New Request');

        try {
            if (HighFiveObjectUtil.isNull(u)) {
                throw new UnauthorizedException();
            }

            if (HighFiveObjectUtil.isNull(id) || HighFiveObjectUtil.isNotNumber(id)) {
                throw new BadRequestException('user id is null or not valid');
            }

            await this.userControllerService.delete(id);
            const message = 'deleteById > Response sent';
            HighFiveControllerUtil.manageEmptyResponse(res, this.logger, message);
        } catch (e) {
            if (e instanceof HttpException) throw e;
            const message = 'deleteById > Error response sent';
            HighFiveControllerUtil.manageUnhandledException(e, res, this.logger, message);
        }
    } 
}