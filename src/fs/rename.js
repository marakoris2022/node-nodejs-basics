import { readdir, rename as renameFunc } from "node:fs/promises";
import { join } from "node:path";

const rename = async () => {
  const basePath = import.meta.dirname;

  try {
    const fileData = await readdir(join(basePath, "files"));

    if (
      (!fileData.includes("properFilename.md") &&
        !fileData.includes("wrongFilename.txt")) ||
      fileData.includes("properFilename.md")
    ) {
      throw new Error("FS operation failed");
    }

    await renameFunc(
      join(basePath, "files", "wrongFilename.txt"),
      join(basePath, "files", "properFilename.md")
    );
  } catch (error) {
    console.error(error.message);
  }
};

await rename();
