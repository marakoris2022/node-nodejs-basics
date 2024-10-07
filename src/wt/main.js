import { Worker } from "worker_threads";
import { join } from "node:path";
import os from "os";

function createWorker(workerNumber) {
  const baseDir = import.meta.dirname;
  return new Promise((resolve, reject) => {
    const worker = new Worker(join(baseDir, "worker.js"), {
      workerData: {
        thread_number: workerNumber,
      },
    });

    worker.on("message", (data) => {
      resolve(data);
    });

    worker.on("error", () => {
      reject(null);
    });
  });
}

const performCalculations = async () => {
  const THREAD_COUNT = os.cpus().length;

  const workerPromises = [];
  for (let i = 0; i < THREAD_COUNT; i++) {
    workerPromises.push(createWorker(10 + i));
  }

  const thread_result = await Promise.allSettled(workerPromises);

  console.log(
    thread_result.map((item) => {
      const tempObject = {};
      tempObject.status = item.status === "fulfilled" ? "resolved" : "error";
      tempObject.data = item.status === "fulfilled" ? item.value : null;
      return tempObject;
    })
  );
};

await performCalculations();
