import * as fs from "fs";
import * as yaml from "js-yaml";
import { SonicIndexer } from "../../indexer/indexer";

export async function start() {
  try {
    let config; //yaml file
    try {
      config = (await yaml.load(fs.readFileSync("./config.yaml", "utf8"))) as any;
    } catch (err: any) {
      console.log("config.yaml file not existing or format changed");
    }
    const indexer = await new SonicIndexer(
      config.sonic.rpc_url,
      config.sonic.program_ids[0]
    );

    await indexer.start();
  } catch (err) {
    console.log(err);
  }
}
