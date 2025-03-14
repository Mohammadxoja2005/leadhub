import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap(): Promise<void> {
    dotenv.config();
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3001);
}

bootstrap();
