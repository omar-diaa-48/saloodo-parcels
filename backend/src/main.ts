import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { UnCaughtExceptionFilter } from './exceptions/uncaught-exception.filter';
import { TransformInterceptor } from './interceptors/response.interceptor';

async function bootstrap() {
	const PORT = process.env.PORT;
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe({
		whitelist: true
	}));

	const config = new DocumentBuilder()
		.setTitle('Saloodo API documentation')
		.setDescription('Saloodo API documentation description')
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api-docs', app, document);

	// response interceptor
	app.useGlobalInterceptors(new TransformInterceptor())

	app.enableCors()

	// server error exceptions
	app.useGlobalFilters(new UnCaughtExceptionFilter())

	// handled error exceptions 
	app.useGlobalFilters(new HttpExceptionFilter())

	await app.listen(PORT);
}

bootstrap()
	.then(() => {
		const message = `App server is up and running, Enviornment: ${process.env.NODE_ENV}, Port: ${process.env.PORT}`;
		console.log(message);
	})
	.catch((error) => {
		console.log(error);
	})
