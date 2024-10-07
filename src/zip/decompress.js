import { createUnzip } from "node:zlib";
import { pipeline } from "node:stream";
import { createReadStream, createWriteStream } from "node:fs";
import { join } from "node:path";

const decompress = async () => {
  const dirPath = import.meta.dirname;
  const sourcePath = join(dirPath, "files", "archive.gz");
  const finalPath = join(dirPath, "files", "fileToCompress.txt");
  const Unzip = createUnzip();

  const source = createReadStream(sourcePath);
  const destination = createWriteStream(finalPath);

  pipeline(source, Unzip, destination, (err) => {
    if (err) {
      console.error("Произошла ошибка:", err);
      process.exitCode = 1;
    }
  });
};

await decompress();
