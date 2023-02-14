import { Controller, Get, Query, Header, StreamableFile } from '@nestjs/common'
import { createReadStream } from 'fs'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('pdf')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="test.pdf"')
  async testPdf(@Query('url') url: string): Promise<StreamableFile | string> {
    try {
      const tmpPath = await this.appService.testPdf(url)
      const file = createReadStream(tmpPath)
      return new StreamableFile(file)
    } catch (err) {
      console.log(err)
      return `Error: ${err.message}`
    }
  }

  @Get('image')
  @Header('Content-Type', 'application/png')
  @Header('Content-Disposition', 'attachment; filename="test.png"')
  async testImage(@Query('url') url: string): Promise<StreamableFile | string> {
    try {
      const tmpPath = await this.appService.testImage(url)
      const file = createReadStream(tmpPath)
      return new StreamableFile(file)
    } catch (err) {
      console.log(err)
      return `Error: ${err.message}`
    }
  }
}
