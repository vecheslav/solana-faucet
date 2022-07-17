import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common'
import { PublicKey } from '@solana/web3.js'
import { AppService } from './app.service'
import { Response } from 'express'
import { ApiProperty } from '@nestjs/swagger'

export class MintDto {
  @ApiProperty({ example: '8LwTcEgjkSUW2PMfoucBmUfRPtJEe5Q4JnJJKHmdmNAX' })
  mint: string
  @ApiProperty({ example: 'DbuU3zy8jkK4wcpbBNX86qdbKPzJCQ9jWguXFXkrRoZt' })
  to: string
  @ApiProperty({ example: 1000 })
  amount: number
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Post('mint')
  async mint(@Body() mintDto: MintDto, @Res() res: Response) {
    const { mint, to, amount } = mintDto

    await this.appService.mintTo(new PublicKey(mint), new PublicKey(to), amount)

    res.status(HttpStatus.OK).json({
      mint,
      to,
      amount,
    })
  }
}
