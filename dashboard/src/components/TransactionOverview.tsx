import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data
const transactionData = [
  { time: "00:00", volume: 1200 },
  { time: "04:00", volume: 1800 },
  { time: "08:00", volume: 2400 },
  { time: "12:00", volume: 3000 },
  { time: "16:00", volume: 2800 },
  { time: "20:00", volume: 2200 },
  { time: "24:00", volume: 1600 },
];

const stats = {
  totalTransactions: "12,345",
  transactionVolume: "1,234,567 $SONIC",
  averageTransactionSize: "100 $SONIC",
  activeWallets: "5,678",
};

const TransactionOverview: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5" component="h2">
            Transaction Overview
          </Typography>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Time Period</InputLabel>
            <Select value="24h" label="Time Period" size="small">
              <MenuItem value="1h">Last Hour</MenuItem>
              <MenuItem value="24h">Last 24 Hours</MenuItem>
              <MenuItem value="7d">Last 7 Days</MenuItem>
              <MenuItem value="30d">Last 30 Days</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: "background.paper" }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Transactions
                </Typography>
                <Typography variant="h4">{stats.totalTransactions}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: "background.paper" }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Transaction Volume
                </Typography>
                <Typography variant="h4">{stats.transactionVolume}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: "background.paper" }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Avg Transaction Size
                </Typography>
                <Typography variant="h4">{stats.averageTransactionSize}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: "background.paper" }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Active Wallets
                </Typography>
                <Typography variant="h4">{stats.activeWallets}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={transactionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="volume"
                stroke="#6366f1"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TransactionOverview;
