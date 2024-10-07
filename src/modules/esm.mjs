import { sep, join } from "path";
import { readFile } from "node:fs/promises";
import { release, version } from "os";
import { createServer as createServerHttp } from "http";
import "./files/c.js";

const random = Math.random();
const basePath = import.meta.dirname;

let unknownObject;

if (random > 0.5) {
  unknownObject = await readFile(join(basePath, "/files/a.json"), "utf-8");
} else {
  unknownObject = await readFile(join(basePath, "/files/b.json"), "utf-8");
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${sep}"`);

console.log(`Path to current file is ${import.meta.filename}`);
console.log(`Path to current directory is ${basePath}`);

const myServer = createServerHttp((_, res) => {
  res.end("Request accepted");
});

const PORT = 3000;

console.log(JSON.parse(unknownObject));

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});

export default {
  unknownObject,
  myServer,
};
