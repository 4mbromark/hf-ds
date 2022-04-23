import { PermitDao } from './app/hf-database/dao/permit.dao';
import { AppDao } from './app/hf-database/dao/app.dao';
import { HighFivePermit } from './app/hf-database/entity/permit.entity';
import { HighFiveApp } from './app/hf-database/entity/app.entity';
import { PswdControllerService } from './app/hf-service/controller/pswd-controller.service';
import { TokenService } from './app/hf-service/token.service';
import { UserDao } from 'src/app/hf-database/dao/user.dao';
import { AuthenticationControllerService } from './app/hf-service/controller/auth-controller.service';
import { UserControllerService } from './app/hf-service/controller/user-controller.service';
import { AuthenticationController } from './app/hf-controller/auth.controller';
import { UserController } from './app/hf-controller/user.controller';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { JwtGuard } from './app/hf-controller/jwt/jwt-guard';
import { JwtStrategy } from './app/hf-controller/jwt/jwt-strategy';
import { CredentialDao } from './app/hf-database/dao/credential.dao';
import { PswdController } from './app/hf-controller/pswd.controller';
import { AppService } from './app/hf-database/service/app.service';
import { HighFiveCredential, HighFiveUser } from 'hf-ds-module';
import { HighFiveLoggerModule } from 'hf-logger-module';
import { HighFiveMailSenderModule } from 'hf-mail-module';
import { HighFiveEnvironmentModule } from 'hf-env-module';
import { CredentialService } from './app/hf-database/service/credential.service';
import { PermitService } from './app/hf-database/service/permit.service';
import { UserService } from './app/hf-database/service/user.service';
@Module({
  imports: [
    // HighFiveLoggerModule,
    HighFiveEnvironmentModule,
    HighFiveMailSenderModule,

    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOSTURL,
      port: +process.env.DB_HOSTPORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PSWD,
      database: process.env.DB_NAME,
      synchronize: false,
      entities: [
        HighFiveUser,
        HighFiveCredential,
        HighFiveApp,
        HighFivePermit
      ],
      migrations: [
        join(__dirname + '/app/hf-database/migration/*.{ts,js}')
      ],
      migrationsRun: true,
      migrationsTableName: "HF_MIGRATION",
    }),
    // npx typeorm migration:create -n CreateTableBluePreferences -d src/app/hf-database/migration
    TypeOrmModule.forFeature([
      HighFiveUser,
      HighFiveCredential,
      HighFiveApp,
      HighFivePermit
    ])
  ],
  controllers: [
    UserController,
    PswdController,
    AuthenticationController,

    // AppController
  ],
  providers: [
    UserControllerService,
    PswdControllerService,
    AuthenticationControllerService,

    TokenService,

    UserService,
    CredentialService,
    AppService,
    PermitService,

    UserDao,
    CredentialDao,
    AppDao,
    PermitDao,

    /** JSONWEBTOKEN */
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtGuard
    }
  ],
})
export class AppModule {}
