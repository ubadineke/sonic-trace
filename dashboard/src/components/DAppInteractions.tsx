import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  LinearProgress,
} from "@mui/material";

// Mock data
const dAppData = [
  {
    id: 1,
    name: "SonicSwap",
    users: 1500,
    transactions: 5000,
    volume: "500,000 $SONIC",
    retention: 85,
    popularFunctions: ["swap", "addLiquidity", "removeLiquidity"],
  },
  {
    id: 2,
    name: "SonicStake",
    users: 800,
    transactions: 2000,
    volume: "300,000 $SONIC",
    retention: 75,
    popularFunctions: ["stake", "unstake", "claimRewards"],
  },
  {
    id: 3,
    name: "SonicNFT",
    users: 1200,
    transactions: 3500,
    volume: "200,000 $SONIC",
    retention: 70,
    popularFunctions: ["mint", "transfer", "listForSale"],
  },
];

const DAppInteractions: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          dApp Interactions
        </Typography>

        <TableContainer component={Paper} sx={{ bgcolor: "background.paper" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>dApp Name</TableCell>
                <TableCell>Active Users</TableCell>
                <TableCell>Transactions</TableCell>
                <TableCell>Volume</TableCell>
                <TableCell>Retention Rate</TableCell>
                <TableCell>Popular Functions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dAppData.map((dApp) => (
                <TableRow key={dApp.id}>
                  <TableCell>
                    <Typography variant="subtitle1">{dApp.name}</Typography>
                  </TableCell>
                  <TableCell>{dApp.users.toLocaleString()}</TableCell>
                  <TableCell>{dApp.transactions.toLocaleString()}</TableCell>
                  <TableCell>{dApp.volume}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box sx={{ width: "100%", mr: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={dApp.retention}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: "background.paper",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor:
                                dApp.retention > 80 ? "#10b981" : "#f59e0b",
                            },
                          }}
                        />
                      </Box>
                      <Typography variant="body2" color="textSecondary">
                        {dApp.retention}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                      {dApp.popularFunctions.map((func) => (
                        <Chip
                          key={func}
                          label={func}
                          size="small"
                          sx={{
                            backgroundColor: "primary.main",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "primary.dark",
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default DAppInteractions;
