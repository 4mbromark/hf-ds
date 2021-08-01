import { PswdControllerService } from './app/hf-service/controller/pswd-controller.service';
import { HighFiveCryptService } from 'hf-common-module';
import { TokenService } from './app/hf-service/token.service';
import { HighFiveCredential, HighFiveUser } from 'hf-ds-module';
import { UserDao } from 'src/app/hf-database/dao/user.dao';
import { CredentialService } from './app/hf-service/database/credential.service';
import { UserService } from './app/hf-service/database/user.service';
import { AuthenticationControllerService } from './app/hf-service/controller/auth-controller.service';
import { UserControllerService } from './app/hf-service/controller/user-controller.service';
import { AuthenticationController } from './app/hf-controller/auth.controller';
import { UserController } from './app/hf-controller/user.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { JwtGuard } from './app/hf-controller/jwt/jwt-guard';
import { JwtStrategy } from './app/hf-controller/jwt/jwt-strategy';
import { CredentialDao } from './app/hf-database/dao/credential.dao';
import { HighFiveLoggerModule } from 'hf-logger-module';
import { PswdController } from './app/hf-controller/pswd.controller';

@Module({
  imports: [
    HighFiveLoggerModule,

    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
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
        HighFiveCredential
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
      HighFiveCredential
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
    HighFiveCryptService,

    UserService,
    CredentialService,

    UserDao,
    CredentialDao,

    /** JSONWEBTOKEN */
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtGuard
    }
  ],
})
export class AppModule {}
