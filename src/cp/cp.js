import { spawn } from "node:child_process";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const spawnChildProcess = async (args) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const pathToFile = join(__dirname, "files", "script.js");

  const child = spawn("node", [pathToFile, ...args], {
    stdio: ["pipe", "pipe", "pipe"],
  });

  process.stdin.pipe(child.stdin);

  child.stdout.pipe(process.stdout);

  child.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
  });

  child.on("exit", (code) => {
    console.log(`Child process exited with code ${code}`);
  });
};

spawnChildProcess(["test", "argument?", "didit?", "gotToSleep..."]);
