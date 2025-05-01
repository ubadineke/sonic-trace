"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clickhouse_1 = require("clickhouse");
//Mock Implementation
class ClickHouseStorage {
    constructor(config, schema) {
        this.client = new clickhouse_1.ClickHouse({
            url: `http://${config.host}:${config.port}`,
            basicAuth: { username: config.user, password: config.password },
            config: { database: config.database },
        });
        this.table = schema.table;
    }
    async initialize() {
        await this.client
            .query(`
      CREATE TABLE IF NOT EXISTS ${this.table} (
        signature String,
        wallet_address String,
        program_id String,
        slot UInt64,
        timestamp DateTime,
        details String
      ) ENGINE = ReplacingMergeTree()
      ORDER BY (timestamp, signature)
    `)
            .toPromise();
    }
    async save(data) {
        await this.client.insert(`INSERT INTO ${this.table}`, [data]).toPromise();
    }
    async query(filter) {
        const query = `SELECT * FROM ${this.table} WHERE wallet_address = '${filter.wallet_address}'`;
        return this.client.query(query).toPromise();
    }
}
