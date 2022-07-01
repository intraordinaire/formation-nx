import {CanActivate, ExecutionContext, Inject, Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {IS_PUBLIC_KEY} from "../decorators/public.decorator";
import {Reflector} from "@nestjs/core";

@Injectable()
export class ApiKeyGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean {
    const request = context.switchToHttp().getRequest();
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

    if(isPublic) {
      return true;
    }

    const authorizationKey = request.header('Authorization');

    return authorizationKey === this.configService.get('API_KEY');
  }
}
