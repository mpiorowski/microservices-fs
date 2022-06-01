import pkg from "pg";
const { Pool, types } = pkg;

types.setTypeParser(1700, "text", parseFloat);

export async function db<T>(query: string, variables: unknown[]): Promise<T[]> {
  const pool = new Pool({ connectionString: process.env.POSTGRES });
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const res = await client.query<T>(query, [...variables]);
    await client.query("COMMIT");
    return res.rows;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
    void pool.end();
  }
}
