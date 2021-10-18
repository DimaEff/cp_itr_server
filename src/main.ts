import {NestFactory} from "@nestjs/core";

import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {GraphQLModule} from '@nestjs/graphql';


const start = async () => {
    const PORT = process.env.PORT || 5000;
    console.log(process.env.GOOGLE_REDIRECT_URI);
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    const config = new DocumentBuilder()
        .setTitle('Course project for the company "itransition"')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
};

start();