import { config } from 'dotenv';
import cluster from "cluster";
import { cpus } from "os";

import {startServer} from './server';

config();

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
  startServer();
}