import { ClickHouse } from "clickhouse";
import { Storage } from "./interfaces";

//Mock Implementation

class ClickHouseStorage implements Storage {
  private client: ClickHouse;
  private table: string;

  constructor(
    config: {
      host: string;
      port: number;
      user: string;
      password: string;
      database: string;
    },
    schema: { table: string }
  ) {
    this.client = new ClickHouse({
      url: `http://${config.host}:${config.port}`,
      basicAuth: { username: config.user, password: config.password },
      config: { database: config.database },
    });
    this.table = schema.table;
  }

  async initialize(): Promise<void> {
    await this.client
      .query(
        `
      CREATE TABLE IF NOT EXISTS ${this.table} (
        signature String,
        wallet_address String,
        program_id String,
        slot UInt64,
        timestamp DateTime,
        details String
      ) ENGINE = ReplacingMergeTree()
      ORDER BY (timestamp, signature)
    `
      )
      .toPromise();
  }

  async save(data: any): Promise<void> {
    await this.client.insert(`INSERT INTO ${this.table}`, [data]).toPromise();
  }

  async query(filter: any): Promise<any[]> {
    const query = `SELECT * FROM ${this.table} WHERE wallet_address = '${filter.wallet_address}'`;
    return this.client.query(query).toPromise();
  }
}
