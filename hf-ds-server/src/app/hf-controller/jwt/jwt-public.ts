import { SetMetadata } from '@nestjs/common';

export const REQUIRE_TOKEN = 'requireToken';
export const Token = () => SetMetadata(REQUIRE_TOKEN, true);