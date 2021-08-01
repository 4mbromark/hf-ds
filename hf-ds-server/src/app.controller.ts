import { All } from '@nestjs/common';
import { Res } from '@nestjs/common';
import { Response } from "express";
import * as path from "path";
import { Controller, Get } from '@nestjs/common';
import { Public } from './app/hf-controller/jwt/jwt-public';

@Controller('/*')
export class AppController {

  @Public()
  @All()
  redirectToAngular(@Res() res: Response) {
    // res.sendFile(path.resolve('../outblue-fronter-next/dist/outblue-fronter-next/index.html'));
  }
}
