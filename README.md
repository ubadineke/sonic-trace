# Sonic Trace

SonicTrace is a modular, extensible tooling framework designed for indexing, analyzing, and visualizing on-chain activities on Sonic SVM, a high-throughput Layer 2 blockchain built on Solana. It enables developers, analysts, and dApp creators to configure custom data pipelines, storage solutions, APIs, and dashboards. The framework emphasizes flexibility, allowing users to bring their own infrastructure (e.g., data warehouses) and integrate with our modern analytics tool.

## Features

**CLI**: Generate config.yaml with sonic-trace init.

**Indexer**: Real-time log monitoring (connection.onLogs) and historical data retrieval.

**Storage**: Supports ClickHouse, Snowflake, PostgreSQL, MongoDB, Redis

**Pipelines**: Configurable ETL with Airflow, Dagster.

**API**: REST (Express) and GraphQL (Apollo) endpoints.

**Dashboard**: Visualizations via Superset or custom Next.js app.

**Configurable**: User-defined setups via config.yaml.

## Installation

```bash
npm install sonic-trace
```

## Usage

Generate Config: Creates config.yaml in the current directory.

```bash
sonic-trace init
```

Edit config.yaml: Add credentials and settings:

```bash
sonic:
   rpc_url: "https://devnet.sonic.game"
   program_ids: ["<SONICX_PROGRAM_ID>"]
data_warehouse:
   type: "clickhouse"
   config:
   host: "<CLICKHOUSE_HOST>"
   user: "<CLICKHOUSE_USER>"
   password: "<CLICKHOUSE_PASSWORD>"
...
```

## Run Components:

**Indexer**:

```bash
sonic-trace start
```

Starts the indexer with the configuraton in the config.yaml file.

**Launch Dashboard**

```bash
sonic-trace dashboard
```

**API**:

**Add Plugin**

## Contributing

SonicTrace is open-source under the MIT license. Contributions are welcome!

Fork the repository.

Create a feature branch: git checkout -b feature-name.

Commit changes: git commit -m "Add feature".

Push and open a pull request.

## License

MIT
