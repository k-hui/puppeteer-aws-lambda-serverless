import { Injectable } from '@nestjs/common'
import puppeteer, { Browser, Page } from 'puppeteer'

@Injectable()
export class AppService {
  // align AWS Lambda filesystem
  pdfPath: string = '/tmp/test.pdf'
  imgPath: string = '/tmp/test.png'

  async configurePage(page: Page) {
    page.setDefaultNavigationTimeout(50000)
    await page.setViewport({ width: 1920, height: 1080 })
    page
      .on('console', (message) =>
        console.log(
          `${message.type().substring(0, 3).toUpperCase()} ${message.text()}`,
        ),
      )
      .on('pageerror', ({ message }) => console.log(message))
      .on('response', (response) =>
        console.log(`${response.status()} ${response.url()}`),
      )
      .on('requestfailed', (request) =>
        console.log(`${request.failure().errorText} ${request.url()}`),
      )
    // To reflect CSS used for screens instead of print
    await page.emulateMediaType('screen')
  }

  async convertPdf(page: Page, path: string) {
    const pdf = await page.pdf({
      path: path,
      pageRanges: '',
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
      printBackground: true,
      format: 'A4',
    })
  }

  async getBrowser(): Promise<Browser> {
    return await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--single-process',
      ],
      ignoreDefaultArgs: ['--disable-extensions'],
    })
  }

  getHello(): string {
    return 'Hello World!'
  }

  async testPdf(url: string): Promise<string> {
    try {
      const browser = await this.getBrowser()
      const browserVersion = await browser.version()
      console.log(`BrowserVersion=${browserVersion}`)

      const page = await browser.newPage()
      await this.configurePage(page)
      await page.goto(url, { waitUntil: 'networkidle0' })
      await this.convertPdf(page, this.pdfPath)

      await browser.close()
      return this.pdfPath
    } catch (err) {
      console.log(err)
      return null
    }
  }

  async testImage(url: string): Promise<string> {
    try {
      const browser = await this.getBrowser()
      const page = await browser.newPage()
      await this.configurePage(page)
      await page.goto(url, { waitUntil: 'networkidle0' })
      await page.screenshot({
        path: this.imgPath,
        type: 'png',
        fullPage: true,
      })
      await browser.close()
      return this.imgPath
    } catch (err) {
      console.log(err)
      return null
    }
  }
}
