"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class MongoDBStorage {
    constructor(config, schema) {
        const url = `mongodb://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}?authSource=admin`;
        this.client = new mongodb_1.MongoClient(url);
        this.table = schema.table;
        this.collection = this.client.db(config.database).collection(this.table);
    }
    async initialize() {
        await this.client.connect();
        await this.client
            .db()
            .createCollection(this.table, {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: [
                        "signature",
                        "wallet_address",
                        "program_id",
                        "slot",
                        "timestamp",
                        "details",
                    ],
                    properties: {
                        signature: { bsonType: "string" },
                        wallet_address: { bsonType: "string" },
                        program_id: { bsonType: "string" },
                        slot: { bsonType: "long" },
                        timestamp: { bsonType: "date" },
                        details: { bsonType: "string" },
                    },
                },
            },
        })
            .catch((err) => {
            if (err.codeName !== "NamespaceExists")
                throw err;
        });
        await this.collection.createIndexes([
            { key: { wallet_address: 1 } },
            { key: { signature: 1 } },
        ]);
    }
    async save(data) {
        await this.collection.insertOne({
            signature: data.signature,
            wallet_address: data.wallet_address,
            program_id: data.program_id,
            slot: data.slot,
            timestamp: new Date(data.timestamp),
            details: data.details,
        });
    }
    async query(filter) {
        const result = await this.collection
            .find({ wallet_address: filter.wallet_address })
            .toArray();
        return result.map((doc) => ({
            signature: doc.signature,
            wallet_address: doc.wallet_address,
            program_id: doc.program_id,
            slot: Number(doc.slot),
            timestamp: doc.timestamp.toISOString(),
            details: doc.details,
        }));
    }
}
// storage/src/postgresql.ts
const pg_1 = require("pg");
class PostgreSQLStorage {
    constructor(config, schema) {
        this.pool = new pg_1.Pool({
            host: config.host,
            port: config.port,
            user: config.user,
            password: config.password,
            database: config.database,
        });
        this.table = schema.table;
    }
    async initialize() {
        await this.pool.query(`
      CREATE TABLE IF NOT EXISTS ${this.table} (
        signature VARCHAR(88) NOT NULL,
        wallet_address VARCHAR(44) NOT NULL,
        program_id VARCHAR(44) NOT NULL,
        slot BIGINT NOT NULL,
        timestamp TIMESTAMP NOT NULL,
        details TEXT NOT NULL,
        PRIMARY KEY (signature, timestamp)
      );
    `);
        await this.pool.query(`CREATE INDEX IF NOT EXISTS idx_wallet_address ON ${this.table} (wallet_address);`);
        await this.pool.query(`CREATE INDEX IF NOT EXISTS idx_signature ON ${this.table} (signature);`);
    }
    async save(data) {
        await this.pool.query(`
      INSERT INTO ${this.table} (signature, wallet_address, program_id, slot, timestamp, details)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [
            data.signature,
            data.wallet_address,
            data.program_id,
            data.slot,
            data.timestamp,
            data.details,
        ]);
    }
    async query(filter) {
        const result = await this.pool.query(`SELECT * FROM ${this.table} WHERE wallet_address = $1`, [filter.wallet_address]);
        return result.rows.map((row) => ({
            signature: row.signature,
            wallet_address: row.wallet_address,
            program_id: row.program_id,
            slot: Number(row.slot),
            timestamp: row.timestamp.toISOString(),
            details: row.details,
        }));
    }
}
