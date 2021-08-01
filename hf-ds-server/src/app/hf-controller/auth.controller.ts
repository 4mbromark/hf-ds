import { AuthenticationControllerService } from './../hf-service/controller/auth-controller.service';
import { Body, Controller, Get, HttpStatus, Logger, Post, Res } from "@nestjs/common";
import { Response } from 'express';
import { Url } from './url/url';
import { Public } from './jwt/jwt-public';


@Controller(Url.BASE + '/auth')
export class AuthenticationController {
    private readonly logger = new Logger(AuthenticationController.name);

    constructor(
        private authControllerService: AuthenticationControllerService
    ) {}

    @Public()
    @Post()
    public async login(@Body() body: any, @Res() res: Response) {
        const { uid, pswd } = body;

        const tk = await this.authControllerService.authenticate(uid, pswd);
        if (tk) {
            res.status(HttpStatus.OK).send(tk);
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
    }

    @Public()
    @Post('/verify')
    public async verify(@Body() body: any, @Res() res: Response) {
        const { tk } = body;

        const user = await this.authControllerService.verify(tk);
        if (user) {
            res.status(HttpStatus.OK).send(user);
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
    }
}