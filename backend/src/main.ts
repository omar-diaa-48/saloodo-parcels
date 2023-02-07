import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

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
