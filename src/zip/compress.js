import { createGzip } from "node:zlib";
import { pipeline } from "node:stream";
import { createReadStream, createWriteStream } from "node:fs";
import { join } from "node:path";

const compress = async () => {
  const dirPath = import.meta.dirname;
  const sourcePath = join(dirPath, "files", "fileToCompress.txt");
  const finalPath = join(dirPath, "files", "archive.gz");
  const gzip = createGzip();

  const source = createReadStream(sourcePath);
  const destination = createWriteStream(finalPath);

  pipeline(source, gzip, destination, (err) => {
    if (err) {
      console.error("Произошла ошибка:", err);
      process.exitCode = 1;
    }
  });
};

await compress();
