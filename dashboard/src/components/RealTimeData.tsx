import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Switch,
  FormControlLabel,
  Divider,
} from "@mui/material";
import {
  AccountBalance as WalletIcon,
  SwapHoriz as SwapIcon,
  Token as TokenIcon,
} from "@mui/icons-material";

// Mock data
const mockTransactions = [
  {
    id: 1,
    type: "transfer",
    from: "0x123...",
    to: "0x456...",
    amount: "100 $SONIC",
    timestamp: new Date().toISOString(),
  },
  {
    id: 2,
    type: "swap",
    from: "0x789...",
    to: "0x012...",
    amount: "50 SOL → 1000 $SONIC",
    timestamp: new Date(Date.now() - 60000).toISOString(),
  },
  {
    id: 3,
    type: "stake",
    from: "0x345...",
    to: "Staking Pool",
    amount: "200 $SONIC",
    timestamp: new Date(Date.now() - 120000).toISOString(),
  },
];

const RealTimeData: React.FC = () => {
  const [isLive, setIsLive] = useState(true);
  const [transactions, setTransactions] = useState(mockTransactions);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isLive) {
      interval = setInterval(() => {
        // Simulate new transactions
        const newTransaction = {
          id: transactions.length + 1,
          type: ["transfer", "swap", "stake"][Math.floor(Math.random() * 3)],
          from: `0x${Math.random().toString(16).slice(2, 5)}...`,
          to: `0x${Math.random().toString(16).slice(2, 5)}...`,
          amount: `${Math.floor(Math.random() * 1000)} $SONIC`,
          timestamp: new Date().toISOString(),
        };

        setTransactions((prev) => [newTransaction, ...prev].slice(0, 10));
      }, 5000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isLive, transactions.length]);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "transfer":
        return <WalletIcon />;
      case "swap":
        return <SwapIcon />;
      case "stake":
        return <TokenIcon />;
      default:
        return <WalletIcon />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" component="h2">
            Real-Time Activity
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={isLive}
                onChange={(e) => setIsLive(e.target.checked)}
                color="primary"
              />
            }
            label="Live"
          />
        </Box>

        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {transactions.map((transaction, index) => (
            <React.Fragment key={transaction.id}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    {getTransactionIcon(transaction.type)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" component="div">
                      {transaction.type.charAt(0).toUpperCase() +
                        transaction.type.slice(1)}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {transaction.amount}
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        color="text.secondary"
                      >
                        From: {transaction.from} → To: {transaction.to}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatTimestamp(transaction.timestamp)}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < transactions.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RealTimeData;
