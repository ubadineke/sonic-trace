"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.theme = void 0;
const styles_1 = require("@mui/material/styles");
exports.theme = (0, styles_1.createTheme)({
    palette: {
        mode: "dark",
        primary: {
            main: "#6366f1", // Indigo
            light: "#818cf8",
            dark: "#4f46e5",
        },
        secondary: {
            main: "#10b981", // Emerald
            light: "#34d399",
            dark: "#059669",
        },
        background: {
            default: "#0f172a", // Slate 900
            paper: "#1e293b", // Slate 800
        },
        text: {
            primary: "#f8fafc", // Slate 50
            secondary: "#cbd5e1", // Slate 300
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: "2.5rem",
            fontWeight: 700,
            letterSpacing: "-0.025em",
        },
        h2: {
            fontSize: "2rem",
            fontWeight: 600,
            letterSpacing: "-0.025em",
        },
        h3: {
            fontSize: "1.5rem",
            fontWeight: 600,
            letterSpacing: "-0.025em",
        },
        h4: {
            fontSize: "1.25rem",
            fontWeight: 600,
            letterSpacing: "-0.025em",
        },
        body1: {
            fontSize: "1rem",
            lineHeight: 1.5,
        },
        body2: {
            fontSize: "0.875rem",
            lineHeight: 1.5,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "0.5rem",
                    textTransform: "none",
                    fontWeight: 500,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: "1rem",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                },
            },
        },
    },
});
