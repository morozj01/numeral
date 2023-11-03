export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { postgres } = await import('@/postgres');
    postgres.sync();
  }
}
