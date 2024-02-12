import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { config } from 'dotenv'
import * as cookieParser from 'cookie-parser'

config()

import { AppModule } from './app.module'
import { PrismaService } from './prisma.service'

import type { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  app.setGlobalPrefix('api')
  app.use(cookieParser())
  app.enableCors({ credentials: true, origin: 'http://localhost:3000' })
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(4200)
}
bootstrap()
