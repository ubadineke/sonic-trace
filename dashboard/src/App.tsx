import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container, Grid } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { theme } from "./styles/theme";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TransactionOverview from "./components/TransactionOverview";
import WalletAnalytics from "./components/WalletAnalytics";
import DAppInteractions from "./components/DAppInteractions";
import RealTimeData from "./components/RealTimeData";
import AlertSystem from "./components/AlertSystem";
import ComparativeAnalysis from "./components/ComparativeAnalysis";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1 }}>
          <Header />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route
                path="/"
                element={
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TransactionOverview />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <WalletAnalytics />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <RealTimeData />
                    </Grid>
                    <Grid item xs={12}>
                      <DAppInteractions />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <AlertSystem />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ComparativeAnalysis />
                    </Grid>
                  </Grid>
                }
              />
              <Route path="/wallet" element={<WalletAnalytics />} />
              <Route path="/dapp" element={<DAppInteractions />} />
              <Route path="/realtime" element={<RealTimeData />} />
              <Route path="/alerts" element={<AlertSystem />} />
              <Route path="/compare" element={<ComparativeAnalysis />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
