import * as path from "path";
import * as fs from "fs";
import { spawn } from "child_process";

export async function dashboard() {
  const dashboardPath = path.resolve(__dirname, "../../../dashboard");
  if (!fs.existsSync(dashboardPath)) {
    console.error("Error: dashboard/ folder not found. Please ensure it exists.");
    process.exit(1);
  }

  const npmRunDev = spawn("npm", ["run", "dev"], {
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
