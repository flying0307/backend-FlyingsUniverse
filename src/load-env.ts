
import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';
const envFile = process.env.NODE_ENV === 'dev' ? '.env.development' : '.env';
console.log(envFile);
dotenvConfig({ path: join(__dirname, '..', envFile) });