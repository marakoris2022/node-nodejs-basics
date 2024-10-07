import { join } from "node:path";
import fs from "node:fs";

const write = async () => {
  const baseFolder = import.meta.dirname;

  const writeableStream = fs.createWriteStream(
    join(baseFolder, "files", "fileToWrite.txt")
  );

  process.stdin.on("data", (data) => {
    writeableStream.write(data.toString());
    process.exit();
  });
};

await write();
