import postgres from 'postgres';

const sql = postgres(process.env.DATABASE as string)

export default sql
