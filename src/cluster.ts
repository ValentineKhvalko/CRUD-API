import cluster from "cluster";
import { cpus } from "os";

if(cluster.isPrimary) {

  const cpusCount = cpus().length;

  for(let i=0; i < cpusCount; i++) {
    const worker = cluster.fork();

    worker.on('exit', () => {
      console.log(`Worker died! Pid ${worker.process.pid}`);
    });
    worker.on('listening', () => {
      console.log(`Worker listening! Pid ${worker.process.pid}`);
    }) 
  }
}

if(cluster.isWorker) {
  (async () => {
    try {
      await import('./index');
    } catch(e) {
      console.log(e);
    }
  })()
}