import { postgres } from '@/postgres';

export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    postgres.sync();
  }
}
