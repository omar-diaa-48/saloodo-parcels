import {
	CallHandler, ExecutionContext, Injectable,
	NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
	code: string;
	message: string;
	data: T;
}

@Injectable()
export class TransformInterceptor<T>
	implements NestInterceptor<T, Response<T>> {
	intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Observable<Response<T>> {

		// const req = context?.switchToHttp()?.getRequest();
		// if (req) { 
		// 	Sentry.captureMessage("OUTGOING_RESPONSE", { extra: { url: req?.url, data: req?.body, headers: req?.headers }, user: req?.user, level: "info" })
		// }

		return next
			.handle()
			.pipe(
				map((data) => ({
					code: context.switchToHttp().getResponse().statusCode,
					message: 'The request has been successfully done',
					data
				})),
			);
	}
}