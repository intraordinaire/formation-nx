import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const Protocol = createParamDecorator((defaultValue: string, ctx: ExecutionContext) => {
  console.log(defaultValue)
  return ctx.switchToHttp().getRequest().protocol || defaultValue;
})
