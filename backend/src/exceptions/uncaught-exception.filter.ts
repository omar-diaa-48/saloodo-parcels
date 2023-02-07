import { ArgumentsHost, Catch, ExceptionFilter, InternalServerErrorException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class UnCaughtExceptionFilter implements ExceptionFilter<InternalServerErrorException> {
	constructor() { }

	catch(exception: InternalServerErrorException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		// const status = exception.getStatus();
		// const message = exception.getResponse()["message"] || exception.message
		// const stack = exception.stack
		// const name = exception.name		

		const message = request.acceptsLanguages("en") ? "Failed to do the current operation" : "فشلت بالقيام بالإجراء الحالي"

		if (process.env.NODE_ENV === "development") {
			console.log({ exception, message: exception["message"] });
		}

		response
			.status(500)
			.json({
				code: 'SERVER ERROR',
				message,
				data: {
					statusCode: 500,
					timestamp: new Date().toISOString(),
					path: request.url,
					exception,
					message,
				}
			});
	}
}