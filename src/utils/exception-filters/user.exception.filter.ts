import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class UserExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    //Handle exceptions raised from mongodb
    if (exception.code && exception.code === 11000) {
        response.status(400).json({ message: 'Record already exists.' });
      } else {
        response.status(500).json({ message: 'Internal Server error.' });
      }

  }
}