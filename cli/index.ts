#!/usr/bin/env node

import { Command } from "commander";
import { init } from "./commands/init";
import { start } from "./commands/start";

const program = new Command();

program
  .name("sonic-trace")
  .description("CLI for SonicTrace: Sonic SVM on-chain analytics framework")
  .version("1.0.0");

program
  .command("init")
  .description("Generate a config.yaml file for SonicTrace")
  .option("-o, --output <path>", "Output path for config.yaml", "./config.yaml")
  .action(init);

program
  .command("start")
  .description("Start indexer with pre-configured settings in config.yaml")
  .option("-o, --output <path>", "Output path for config.yaml", "./config.yaml")
  .action(start);

program.parse(process.argv);
