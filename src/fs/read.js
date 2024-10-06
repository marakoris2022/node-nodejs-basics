import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const read = async () => {
  const basePath = import.meta.dirname;

  try {
    const fileList = await readdir(join(basePath, "files"));

    if (!fileList.includes("fileToRead.txt")) {
      throw new Error("FS operation failed");
    }

    console.log(
      await readFile(join(basePath, "files", "fileToRead.txt"), {
        encoding: "utf8",
      })
    );
  } catch (error) {
    console.error(error.message);
  }
};

await read();
