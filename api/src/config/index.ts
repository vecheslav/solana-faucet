export const config = {
  port: +process.env.PORT || 4000,
  cors: process.env.CORS || true,
  endpoint: process.env.ENDPOINT || 'https://api.devnet.solana.com',
}

export default () => config
