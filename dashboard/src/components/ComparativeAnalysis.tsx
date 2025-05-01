import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data
const mockComparisonData = {
  wallets: [
    {
      address: "So11111111111111111111111111111111111111112",
      balance: "1000 $SONIC",
      transactions: 150,
      lastActive: "2024-03-20",
    },
    {
      address: "So22222222222222222222222222222222222222223",
      balance: "2000 $SONIC",
      transactions: 300,
      lastActive: "2024-03-20",
    },
  ],
  volumeData: [
    { date: "2024-03-14", wallet1: 100, wallet2: 150 },
    { date: "2024-03-15", wallet1: 120, wallet2: 180 },
    { date: "2024-03-16", wallet1: 140, wallet2: 200 },
    { date: "2024-03-17", wallet1: 160, wallet2: 220 },
    { date: "2024-03-18", wallet1: 180, wallet2: 240 },
    { date: "2024-03-19", wallet1: 200, wallet2: 260 },
    { date: "2024-03-20", wallet1: 220, wallet2: 280 },
  ],
};

const ComparativeAnalysis: React.FC = () => {
  const [selectedWallets, setSelectedWallets] = useState<string[]>([]);
  const [newWallet, setNewWallet] = useState("");

  const handleAddWallet = () => {
    if (newWallet && !selectedWallets.includes(newWallet)) {
      setSelectedWallets([...selectedWallets, newWallet]);
      setNewWallet("");
    }
  };

  const handleRemoveWallet = (wallet: string) => {
    setSelectedWallets(selectedWallets.filter((w) => w !== wallet));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Comparative Analysis
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Select Wallets to Compare
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              label="Wallet Address"
              value={newWallet}
              onChange={(e) => setNewWallet(e.target.value)}
              sx={{ flexGrow: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleAddWallet}
              disabled={!newWallet || selectedWallets.includes(newWallet)}
            >
              Add Wallet
            </Button>
          </Box>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {selectedWallets.map((wallet) => (
              <Chip
                key={wallet}
                label={wallet}
                onDelete={() => handleRemoveWallet(wallet)}
                color="primary"
              />
            ))}
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Transaction Volume Comparison
            </Typography>
            <Box sx={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockComparisonData.volumeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="wallet1"
                    stroke="#6366f1"
                    name="Wallet 1"
                  />
                  <Line
                    type="monotone"
                    dataKey="wallet2"
                    stroke="#10b981"
                    name="Wallet 2"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Wallet Statistics
            </Typography>
            <TableContainer component={Paper} sx={{ bgcolor: "background.paper" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Wallet Address</TableCell>
                    <TableCell align="right">Balance</TableCell>
                    <TableCell align="right">Transactions</TableCell>
                    <TableCell align="right">Last Active</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockComparisonData.wallets.map((wallet) => (
                    <TableRow key={wallet.address}>
                      <TableCell>{wallet.address}</TableCell>
                      <TableCell align="right">{wallet.balance}</TableCell>
                      <TableCell align="right">{wallet.transactions}</TableCell>
                      <TableCell align="right">{wallet.lastActive}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ComparativeAnalysis;
