import { appendFile, readFile, opendir, cp } from "node:fs/promises";
import { join } from "node:path";

const copy = async () => {
  const basePath = import.meta.dirname;

  try {
    await opendir(join(basePath, "files"));
    const copiedFilesFolder = await opendir(join(basePath, "files_copy"));
    if (copiedFilesFolder) throw new Error("FS operation failed");
  } catch (error) {
    if (error.path && error.path.includes("files_copy")) {
      await cp(join(basePath, "files"), join(basePath, "files_copy"), {
        recursive: true,
      });
      return;
    }
    if (error.code === "ENOENT") {
      console.error("FS operation failed");
      return;
    }
    console.error(error.message);
  }
};

await copy();
