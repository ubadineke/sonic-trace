import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from "@mui/material";
import {
  Notifications as AlertIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";

// Mock data
const mockAlerts = [
  {
    id: 1,
    type: "Large Transaction",
    condition: "Amount > 1000 $SONIC",
    status: "active",
    lastTriggered: "2024-03-20 14:30",
  },
  {
    id: 2,
    type: "Wallet Activity",
    condition: "New wallet interaction",
    status: "active",
    lastTriggered: "2024-03-20 13:15",
  },
  {
    id: 3,
    type: "dApp Usage",
    condition: "SonicSwap volume > 10000 $SONIC",
    status: "inactive",
    lastTriggered: "2024-03-19 16:45",
  },
];

const AlertSystem: React.FC = () => {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [newAlert, setNewAlert] = useState({
    type: "",
    condition: "",
  });

  const handleAddAlert = () => {
    if (newAlert.type && newAlert.condition) {
      const alert = {
        id: alerts.length + 1,
        ...newAlert,
        status: "active",
        lastTriggered: new Date().toISOString(),
      };
      setAlerts([...alerts, alert]);
      setNewAlert({ type: "", condition: "" });
    }
  };

  const handleDeleteAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Alert System
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Create New Alert
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Alert Type</InputLabel>
              <Select
                value={newAlert.type}
                label="Alert Type"
                onChange={(e) => setNewAlert({ ...newAlert, type: e.target.value })}
              >
                <MenuItem value="Large Transaction">Large Transaction</MenuItem>
                <MenuItem value="Wallet Activity">Wallet Activity</MenuItem>
                <MenuItem value="dApp Usage">dApp Usage</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Condition"
              value={newAlert.condition}
              onChange={(e) => setNewAlert({ ...newAlert, condition: e.target.value })}
              sx={{ flexGrow: 1 }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddAlert}
              disabled={!newAlert.type || !newAlert.condition}
            >
              Add Alert
            </Button>
          </Box>
        </Box>

        <Typography variant="h6" gutterBottom>
          Active Alerts
        </Typography>
        <List>
          {alerts.map((alert, index) => (
            <React.Fragment key={alert.id}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleDeleteAlert(alert.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemIcon>
                  <AlertIcon color={alert.status === "active" ? "primary" : "disabled"} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="subtitle1">{alert.type}</Typography>
                      <Chip
                        label={alert.status}
                        size="small"
                        color={alert.status === "active" ? "success" : "default"}
                      />
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary">
                        Condition: {alert.condition}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Last Triggered: {alert.lastTriggered}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < alerts.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default AlertSystem;
