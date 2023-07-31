
import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';
if (process.env.NODE_ENV != 'docker') {
  const envFile = process.env.NODE_ENV === 'dev' ? '.env.development' : '.env';
  console.log(envFile);
  dotenvConfig({ path: join(__dirname, '..', envFile) });
} else {
  console.log('Run in docker!');
  dotenvConfig({ path: join(__dirname, '..', '.env.docker') });
}