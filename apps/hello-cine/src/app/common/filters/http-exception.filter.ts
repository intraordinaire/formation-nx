import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception.getStatus();
    const message = exception.getResponse();

    const error = typeof message === 'string' ?
      {
        message,
      } :
      message;

    response.status(status).json({
      ...error,
      timestamp: (new Date()).toISOString(),
    });
  }
}
