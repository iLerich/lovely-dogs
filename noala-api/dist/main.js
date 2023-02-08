"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const express_session_1 = require("express-session"), localSession = express_session_1;
const app_module_1 = require("./app.module");
const fs_1 = require("fs");
const http_1 = require("http");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Lovely Dog API')
        .setDescription('Lovely Dog')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const session = process.env.NODE_ENV === 'development' ? localSession : express_session_1.default;
    app.use(session({
        secret: 'Noala',
        resave: false,
        saveUninitialized: false,
    }));
    await app.listen(3000);
    if (process.env.NODE_ENV === 'development') {
        const serverUrl = await app.getUrl();
        (0, http_1.get)(`${serverUrl}/api/swagger-ui-bundle.js`, function (response) {
            response.pipe((0, fs_1.createWriteStream)('swagger-static/swagger-ui-bundle.js'));
            console.log(`Swagger UI bundle file written to: '/swagger-static/swagger-ui-bundle.js'`);
        });
        (0, http_1.get)(`${serverUrl}/api/swagger-ui-init.js`, function (response) {
            response.pipe((0, fs_1.createWriteStream)('swagger-static/swagger-ui-init.js'));
            console.log(`Swagger UI init file written to: '/swagger-static/swagger-ui-init.js'`);
        });
        (0, http_1.get)(`${serverUrl}/api/swagger-ui-standalone-preset.js`, function (response) {
            response.pipe((0, fs_1.createWriteStream)('swagger-static/swagger-ui-standalone-preset.js'));
            console.log(`Swagger UI standalone preset file written to: '/swagger-static/swagger-ui-standalone-preset.js'`);
        });
        (0, http_1.get)(`${serverUrl}/api/swagger-ui.css`, function (response) {
            response.pipe((0, fs_1.createWriteStream)('swagger-static/swagger-ui.css'));
            console.log(`Swagger UI css file written to: '/swagger-static/swagger-ui.css'`);
        });
    }
}
bootstrap();
//# sourceMappingURL=main.js.map