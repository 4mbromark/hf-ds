import { AppPermit } from './../../app-permit';
import { SetMetadata } from '@nestjs/common';

export const REQUIRE_PERMIT = 'requirePermit';
export const Permit = (permit: AppPermit) => SetMetadata(REQUIRE_PERMIT, permit);