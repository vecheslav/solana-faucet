import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = app.get(ConfigService)
  const cors = config.get('cors')
  const port = config.get('port')

  // Cors
  if (cors) {
    app.enableCors()
  }

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder().setTitle('Faucet API').setVersion('1.0').addTag('faucet').build(),
  )
  SwaggerModule.setup('api', app, document)

  await app.listen(port)
}
bootstrap()
