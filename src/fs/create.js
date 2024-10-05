import { appendFile, readFile } from "node:fs/promises";
import { join } from "node:path";

const create = async () => {
  const basePath = import.meta.dirname;
  const filePath = join(basePath, "./files/fresh.txt");

  try {
    const fileData = await readFile(filePath);
    if (fileData) throw new Error("FS operation failed");
  } catch (error) {
    if (error.code === "ENOENT") {
      await appendFile(filePath, "I am fresh and young");
    } else {
      console.error(error);
    }
  }
};

await create();
