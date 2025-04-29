import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// Mock data
const transactionHistory = [
  {
    id: 1,
    date: "2024-03-20",
    type: "Transfer",
    amount: "100 $SONIC",
    from: "0x123...",
    to: "0x456...",
  },
  {
    id: 2,
    date: "2024-03-19",
    type: "Swap",
    amount: "50 $SONIC",
    from: "0x123...",
    to: "0x789...",
  },
  {
    id: 3,
    date: "2024-03-18",
    type: "Stake",
    amount: "200 $SONIC",
    from: "0x123...",
    to: "Staking Pool",
  },
];

const assetDistribution = [
  { name: "$SONIC", value: 60 },
  { name: "SOL", value: 25 },
  { name: "Other", value: 15 },
];

const COLORS = ["#6366f1", "#10b981", "#f59e0b"];

const WalletAnalytics: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [walletAddress, setWalletAddress] = useState("");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Wallet Analytics
        </Typography>

        <TextField
          fullWidth
          label="Wallet Address"
          variant="outlined"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label="Transaction History" />
            <Tab label="Asset Distribution" />
            <Tab label="dApp Interactions" />
          </Tabs>
        </Box>

        {selectedTab === 0 && (
          <TableContainer component={Paper} sx={{ bgcolor: "background.paper" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionHistory.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>{row.from}</TableCell>
                    <TableCell>{row.to}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {selectedTab === 1 && (
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {assetDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        )}

        {selectedTab === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              dApp Interaction Summary
            </Typography>
            <Typography>
              Coming soon: Detailed breakdown of dApp interactions and usage patterns.
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default WalletAnalytics;
