import { createReadStream } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const calculateHash = async () => {
  const basePath = import.meta.dirname;
  const hash = createHash("sha256");
  const input = createReadStream(
    join(basePath, "files", "fileToCalculateHashFor.txt")
  );

  input.on("readable", () => {
    const data = input.read();
    if (data) hash.update(data);
    else {
      console.log(`${hash.digest("hex")}`);
    }
  });
};

await calculateHash();
