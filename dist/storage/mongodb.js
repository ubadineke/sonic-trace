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
