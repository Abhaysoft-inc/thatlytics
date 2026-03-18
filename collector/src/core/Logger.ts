import { createLogger, transports, format } from "winston";
import { environment, logDirectory } from "../config/config.js";
import path from "path";
import fs from "fs";

let dir = logDirectory;  // this will contain the directory which will logs the errors

if (!dir) dir = path.resolve("logs")

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
}

const logLevel = environment === "development" ? "debug" : "warn"

