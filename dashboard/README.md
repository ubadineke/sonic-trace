# SonicTrace Dashboard

A modern, responsive dashboard for monitoring and analyzing blockchain transactions, wallet activities, and dApp interactions.

## Features

- Transaction Overview with real-time statistics
- Wallet Analytics with detailed transaction history
- dApp Interactions monitoring
- Real-time transaction feed
- Customizable alerts system
- Comparative analysis of wallets and dApps
- Export and sharing capabilities

## Tech Stack

- React 18
- TypeScript
- Material-UI (MUI)
- Recharts for data visualization
- React Router for navigation

## Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/sonic-trace.git
cd sonic-trace/Dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The dashboard will be available at http://localhost:3001

## Project Structure

```
Dashboard/
├── src/
│   ├── components/         # React components
│   ├── hooks/             # Custom React hooks
│   ├── styles/            # Global styles and theme
│   ├── utils/             # Utility functions
│   ├── assets/            # Static assets
│   ├── App.tsx           # Main App component
│   └── index.tsx         # Entry point
├── package.json
└── README.md
```

## Development

- The dashboard uses a dark theme by default
- All components are built with Material-UI
- Charts are implemented using Recharts
- Mock data is used for demonstration purposes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
