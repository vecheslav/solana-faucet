import { Inject, Injectable } from '@nestjs/common'
import { mintTo } from '@solana/spl-token'
import { Connection, Keypair, PublicKey } from '@solana/web3.js'

const SECRET_KEY = Uint8Array.from([
  230, 130, 183, 211, 202, 141, 184, 115, 203, 212, 117, 219, 8, 19, 135, 200, 67, 52, 225, 10, 106,
  126, 118, 143, 20, 191, 14, 208, 157, 155, 199, 41, 109, 125, 225, 87, 230, 88, 40, 215, 184, 236,
  122, 125, 218, 233, 30, 111, 9, 20, 128, 200, 48, 109, 187, 135, 196, 140, 252, 2, 55, 207, 142,
  141,
])

@Injectable()
export class AppService {
  private payer: Keypair

  constructor(@Inject('CONNECTION') private connection: Connection) {
    this.payer = Keypair.fromSecretKey(SECRET_KEY)
  }

  getHello(): string {
    return 'Hello World!'
  }

  async mintTo(mint: PublicKey, to: PublicKey, amount: number) {
    return mintTo(this.connection, this.payer, mint, to, this.payer, amount)
  }
}
