import { Connection, PublicKey } from "@solana/web3.js";

export class SonicIndexer {
  private connection: Connection;
  // private storage: Storage
  private programId?: PublicKey;

  constructor(rpcUrl: string, programId?: string, storage?: Storage) {
    this.connection = new Connection(rpcUrl, "confirmed");
    // this.storage = storage;
    if (programId) this.programId = new PublicKey(programId);
  }

  async start() {
    // // await this.storage.initialize();
    // await console.log("Logging has started...");
    await this.connection.onLogs(
      this.programId || "all",
      (logs, context) => {
        console.log("New logs received: ", logs);
        // const data = {
        //   signature: logs.signature,
        //   // wallet_address: logs.logs.join(" "), // Simplified; parse for actual addresses
        //   program_id: this.programId?.toBase58() || "all",
        //   slot: logs.slot,
        //   timestamp: new Date().toISOString(),
        //   details: JSON.stringify(logs.logs),
        // };
        // console.log("Streamed data: ", data);
      },
      "confirmed"
    );
  }
}

let fetchLogs = new SonicIndexer(
  "https://api.mainnet-alpha.sonic.game",
  "SegazTQwbYWknDZkJ6j2Kgvm5gw3MrHGKtWstZdoNKZ"
);
fetchLogs.start().catch(console.error);

// // Sonic SVM Devnet RPC endpoint (replace with mainnet when available)
// const connection = new Connection("https://api.mainnet-alpha.sonic.game", "confirmed");
// console.log(connection);

// // Program ID of a Sonic dApp (e.g., SonicX or a game)
// const programId = new PublicKey("SegazTQwbYWknDZkJ6j2Kgvm5gw3MrHGKtWstZdoNKZ");
// console.log(2);

// async function monitorLogs() {
//   console.log(3);
//   console.log("Starting log monitoring...");
//   connection.onLogs(
//     programId,
//     (logs, context) => {
//       console.log("New logs received:", logs);
//       // Extract relevant data from logs
//       // const { signature, logs: logMessages } = logs;
//       // Example: Check for token transfer or dApp interaction
//       // logMessages.forEach((log) => {
//       //   if (log.includes("Transfer")) {
//       //     console.log(`Detected token transfer in transaction: ${signature}`);
//       //     // Store in database (e.g., PostgreSQL)
//       //     storeTransaction({
//       //       signature,
//       //       type: "transfer",
//       //       timestamp: context.slot,
//       //       details: log,
//       //     });
//       //   }
//       // });
//     },
//     "confirmed"
//   );
// }

// async function storeTransaction(data: any) {
//   // Implement database storage (e.g., PostgreSQL)
//   console.log("Storing transaction:", data);
// }

// monitorLogs().catch(console.error);
