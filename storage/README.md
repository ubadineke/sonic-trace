# Storage Module

The Storage module provides a flexible and extensible way to store and retrieve transaction data in SonicTrace. It implements a common interface that allows for different database backends while maintaining consistent functionality.

## Storage Interface

All storage implementations must adhere to the following interface:

```typescript
interface Storage {
  initialize(): Promise<void>;
  save(data: any): Promise<void>;
  query(filter: any): Promise<any[]>;
}
```

## Implemented Storage Backends

### 1. PostgreSQL Storage (`postgresql.ts`)

A relational database implementation using PostgreSQL. Features:

- Structured table schema with indexes for efficient querying
- Support for transaction signatures, wallet addresses, and program IDs
- Timestamp-based primary key for unique transaction identification
- Optimized indexes for wallet address and signature lookups

### 2. MongoDB Storage (`mongodb.ts`)

A NoSQL implementation using MongoDB. Features:

- Flexible document-based storage
- Schema validation for data consistency
- Indexed fields for efficient querying
- Support for complex transaction details in JSON format
- Automatic connection management

### 3. ClickHouse Storage (`clickhouse.ts`)

A column-oriented database implementation for high-performance analytics. Features:

- Optimized for time-series data
- ReplacingMergeTree engine for efficient data updates
- High-performance querying capabilities
- Support for large-scale data analysis

## Common Features

All storage implementations support:

- Transaction data storage with signature, wallet address, program ID, slot, timestamp, and details
- Initialization of required database structures
- Saving new transaction records
- Querying transactions by wallet address
- Connection management and error handling

## Usage Example

```typescript
import { loadConfig } from "../config";
import { PostgreSQLStorage } from "./postgresql";

// Load configuration from config.yaml
const config = loadConfig();

// Initialize storage with configuration
const storage = new PostgreSQLStorage(config.storage.postgresql, {
  table: config.storage.table,
});

// Initialize the storage
await storage.initialize();

// Save a transaction
await storage.save({
  signature: "2x...", // Transaction signature
  wallet_address: "4x...", // Wallet address
  program_id: "3x...", // Program ID
  slot: 123456, // Slot number
  timestamp: new Date(), // Transaction timestamp
  details: JSON.stringify({
    // Transaction details
    type: "transfer",
    amount: 1000000,
    token: "SOL",
    status: "confirmed",
  }),
});

// Query transactions for a specific wallet
const transactions = await storage.query({
  wallet_address: "4x...", // Wallet address to query
});
```

## Configuration

The storage module is configured through the `config.yaml` file. Here's an example configuration:

```yaml
storage:
  table: "transactions"
  postgresql:
    host: "localhost"
    port: 5432
    user: "sonictrace"
    password: "${POSTGRES_PASSWORD}"
    database: "sonictrace"
  mongodb:
    host: "localhost"
    port: 27017
    user: "sonictrace"
    password: "${MONGO_PASSWORD}"
    database: "sonictrace"
  clickhouse:
    host: "localhost"
    port: 9000
    user: "sonictrace"
    password: "${CLICKHOUSE_PASSWORD}"
    database: "sonictrace"
```

Note: Passwords should be stored as environment variables and referenced using the `${VARIABLE_NAME}` syntax.

## Notes

- The storage module is designed to be easily extensible for additional database backends
- All implementations include proper error handling and connection management
- Indexes are created automatically during initialization for optimal query performance
- Data consistency is maintained through appropriate primary keys and constraints
- Configuration is managed through the central `config.yaml` file
- Sensitive credentials should be stored as environment variables
