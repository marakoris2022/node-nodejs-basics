import { join } from "node:path";
import fs from "node:fs";

const read = async () => {
  const baseFolder = import.meta.dirname;
  const readableStream = fs.createReadStream(
    join(baseFolder, "files", "fileToRead.txt")
  );

  readableStream.pipe(process.stdout);
};

await read();
