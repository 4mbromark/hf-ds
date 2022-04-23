import { HighFiveObjectUtil } from 'hf-common-module';
import { HighFiveApp } from './../../hf-database/entity/app.entity';
import { REQUIRE_TOKEN } from './jwt-public';
import { ExecutionContext, Injectable, NotImplementedException, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { REQUIRE_PERMIT } from './jwt-permit';
import { AppService } from 'src/app/hf-database/service/app.service';
import { AppPermit } from 'src/app/app-permit';
import { HighFiveCryptUtil } from 'hf-common-module';
import { PermitService } from 'src/app/hf-database/service/permit.service';

@Injectable()
export class JwtGuard extends AuthGuard('jwtStrategy') {

    constructor(
        private readonly reflector: Reflector,
        private readonly appService: AppService,
        private readonly permitService: PermitService
    ) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const requireToken = this.reflector.getAllAndOverride<boolean>(REQUIRE_TOKEN, [
            context.getHandler(),
            context.getClass(),
        ]);

        const requirePermit = this.reflector.getAllAndOverride<AppPermit>(REQUIRE_PERMIT, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requirePermit) {
            throw new NotImplementedException();
        }

        const request = context.switchToHttp().getRequest();
        const { headers } = request;
        const name = headers.hfappname;
        const token = headers.hfapptoken;

        if (!name || !token) {
            throw new UnauthorizedException('missing app name or app token');
        }

        return new Promise<boolean>(async (resolve, reject) => {
            await this.appService.getByName(name).then(async (app: HighFiveApp) => {

                const check = await HighFiveCryptUtil.check(token, app.token);

                const permitList = await this.permitService.getByIdApp(app.id);
                const permit = permitList.find(p => p.code === requirePermit);
    
                if (HighFiveObjectUtil.isNotNull(check) && HighFiveObjectUtil.isNotNull(permit)) {
                    if (requireToken === undefined) {
                        resolve(true);
                    } else {
                        const bool = await super.canActivate(context);
                        resolve(bool as boolean);
                    }
                } else {
                    resolve(false);
                    // throw new UnauthorizedException('provided app token is not valid or user not have required permits');
                }
            }).catch((e: Error) => {
                resolve(false);
                // throw new UnauthorizedException('provided app name not registered or not valid');
            });
        });   
    }
}