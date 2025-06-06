"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = dashboard;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const child_process_1 = require("child_process");
async function dashboard() {
    const dashboardPath = path.resolve(__dirname, "../../../dashboard");
    if (!fs.existsSync(dashboardPath)) {
        console.error("Error: dashboard/ folder not found. Please ensure it exists.");
        process.exit(1);
    }
    const npmRunDev = (0, child_process_1.spawn)("npm", ["run", "dev"], {
        cwd: dashboardPath,
        stdio: "inherit", // Inherit stdout/stderr for real-time logs
    });
    npmRunDev.on("error", (err) => {
        console.error(`Failed to start dashboard: ${err.message}`);
        process.exit(1);
    });
    npmRunDev.on("close", (code) => {
        if (code !== 0) {
            console.error(`Dashboard process exited with code ${code}`);
            process.exit(code);
        }
    });
}
