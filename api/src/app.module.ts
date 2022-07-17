import { Logger, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Connection } from '@solana/web3.js'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import config from './config'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [config] })],
  providers: [
    {
      provide: 'CONNECTION',
      useFactory: async (configService: ConfigService, logger = new Logger('Run')) => {
        const endpoint = configService.get('endpoint')
        logger.log('Connecting to blockchain node...')
        logger.log(`Endpoint: ${endpoint}`)
        return new Connection(endpoint, 'recent')
      },
      inject: [ConfigService],
    },
    AppService,
  ],
  controllers: [AppController],
})
export class AppModule {}
