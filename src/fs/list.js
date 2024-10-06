import { readdir } from "node:fs/promises";
import { join } from "node:path";

const list = async () => {
  const basePath = import.meta.dirname;

  try {
    const fileList = await readdir(join(basePath));

    if (!fileList.includes("files")) {
      throw new Error("FS operation failed");
    }

    console.log(await readdir(join(basePath, "files")));
  } catch (error) {
    console.error(error.message);
  }
};

await list();
