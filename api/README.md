# SonicTrace API Documentation

This document outlines the API endpoints required for the SonicTrace Dashboard components.

## API Endpoints

### 1. Transaction Overview

```
GET /api/transaction/:signature
- Retrieve details of a specific transaction by its signature.

GET /api/transactions
- Retrieve a list of transactions with filters.
- Query Params: program_id, wallet_address, start_slot, end_slot, start_date, end_date, limit, offset.

GET /api/transactions/overview
- Returns summary statistics for transactions
- Response: { totalTransactions, transactionVolume, averageTransactionSize, activeWallets }

GET /api/transactions/trend
- Returns transaction volume over time
- Query params: timePeriod (1h, 24h, 7d, 30d)
- Response: Array of { time, volume }
```

### 2. Wallet Analytics

```
GET /api/wallets/{address}
- Returns wallet details and balance
- Response: { address, balance, tokens, lastActive }

GET /api/wallets/{address}/transactions
- Returns transaction history for a wallet
- Query params: page, limit, startDate, endDate
- Response: { transactions: Array<{ id, date, type, amount, from, to }>, total, page, limit }

GET /api/wallets/{address}/assets
- Returns asset distribution for a wallet
- Response: Array of { name, value, percentage }

GET /api/wallets/{address}/dapp-interactions
- Returns dApp interaction summary for a wallet
- Response: Array of { dappName, interactionCount, lastInteraction }
```

### 3. dApp Interactions

```
GET /api/dapps
- Returns list of dApps with usage statistics
- Response: Array of { id, name, users, transactions, volume, retention, popularFunctions }

GET /api/dapps/{id}
- Returns detailed information about a specific dApp
- Response: { id, name, description, users, transactions, volume, retention, popularFunctions, userGrowth }

GET /api/dapps/{id}/functions
- Returns popular functions for a dApp
- Response: Array of { name, callCount, uniqueUsers }
```

### 4. Real-Time Data

```
GET /api/transactions/live
- Returns real-time transaction feed
- Query params: limit (default: 10)
- Response: Array of { id, type, from, to, amount, timestamp }

WebSocket /ws/transactions
- WebSocket connection for real-time transaction updates
- Events: { type: 'transaction', data: { id, type, from, to, amount, timestamp } }
```

### 5. Alert System

```
GET /api/alerts
- Returns configured alerts
- Response: Array of { id, type, condition, status, lastTriggered }

POST /api/alerts
- Creates a new alert
- Request body: { type, condition }
- Response: { id, type, condition, status, lastTriggered }

DELETE /api/alerts/{id}
- Deletes an alert
- Response: { success: true }

GET /api/alerts/history
- Returns alert history
- Response: Array of { id, alertId, type, condition, triggeredAt, data }
```

### 6. Comparative Analysis

```
POST /api/analysis/compare-wallets
- Compares multiple wallets
- Request body: { walletAddresses: string[] }
- Response: { wallets: Array<{ address, balance, transactions, lastActive }>, volumeData: Array<{ date, [walletAddress]: number }> }

POST /api/analysis/compare-dapps
- Compares multiple dApps
- Request body: { dappIds: string[] }
- Response: { dapps: Array<{ id, name, users, transactions, volume }>, metrics: Array<{ date, [dappId]: number }> }
```

### 7. Export and Share

```
GET /api/export/transactions
- Exports transaction data
- Query params: format (csv, json, pdf), startDate, endDate, filters
- Response: File download

GET /api/export/wallet-report
- Exports wallet report
- Query params: address, format (csv, json, pdf)
- Response: File download

GET /api/export/dapp-report
- Exports dApp report
- Query params: dappId, format (csv, json, pdf)
- Response: File download

POST /api/share/report
- Creates a shareable report link
- Request body: { reportType, parameters, expiry }
- Response: { shareUrl, expiry }
```

<!--
### Authentication and User Management

```
POST /api/auth/login
- Authenticates a user
- Request body: { username, password }
- Response: { token, user }

GET /api/auth/user
- Returns current user information
- Response: { id, username, email, preferences }

PUT /api/auth/preferences
- Updates user preferences
- Request body: { theme, notifications, dashboardLayout }
- Response: { success: true }
```
-->
