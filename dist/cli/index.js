#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const init_1 = require("./commands/init");
const start_1 = require("./commands/start");
const program = new commander_1.Command();
program
    .name("sonic-trace")
    .description("CLI for SonicTrace: Sonic SVM on-chain analytics framework")
    .version("1.0.0");
program
    .command("init")
    .description("Generate a config.yaml file for SonicTrace")
    .option("-o, --output <path>", "Output path for config.yaml", "./config.yaml")
    .action(init_1.init);
program
    .command("start")
    .description("Start indexer with pre-configured settings in config.yaml")
    .option("-o, --output <path>", "Output path for config.yaml", "./config.yaml")
    .action(start_1.start);
program.parse(process.argv);
