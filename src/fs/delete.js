import { readdir, unlink } from "node:fs/promises";
import { join } from "node:path";

const remove = async () => {
  const basePath = import.meta.dirname;

  try {
    const fileData = await readdir(join(basePath, "files"));

    if (!fileData.includes("fileToRemove.txt")) {
      throw new Error("FS operation failed");
    }

    await unlink(join(basePath, "files", "fileToRemove.txt"));
  } catch (error) {
    console.error(error.message);
  }
};

await remove();
