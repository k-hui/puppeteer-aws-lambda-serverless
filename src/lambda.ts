import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import { Context, Handler } from 'aws-lambda'
import { RequestListener } from 'http'
import { AppModule } from './app.module'
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common'
import express from 'express'
require('source-map-support/register')
import { configure as serverlessExpress } from '@vendia/serverless-express'
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerCustomOptions,
} from '@nestjs/swagger'

let cachedApp: RequestListener

function setupSwagger(app: INestApplication) {
  const version = process.env.npm_package_version ?? '0.0.0'
  const title = process.env.npm_package_name ?? 'Title'
  const description = process.env.npm_package_description ?? 'Description'
  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .build()
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  }
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: title,
  }
  const document = SwaggerModule.createDocument(app, config, options)
  SwaggerModule.setup('docs', app, document, customOptions)
}

async function bootstrapServer(): Promise<RequestListener> {
  if (!cachedApp) {
    const expressApp = express()
    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
      {
        logger: ['error', 'warn', 'debug'],
      },
    )
    setupSwagger(nestApp)
    nestApp.useGlobalPipes(new ValidationPipe())
    nestApp.enableVersioning({
      type: VersioningType.URI,
    })
    await nestApp.init()
    cachedApp = expressApp
  }
  return cachedApp
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: any,
) => {
  const app = await bootstrapServer()
  const handler = serverlessExpress({
    app: app,
    // important for download png and pdf
    binarySettings: {
      isBinary: true,
      contentTypes: ['application/png', 'application/pdf'],
    },
  })
  return handler(event, context, callback)
}
