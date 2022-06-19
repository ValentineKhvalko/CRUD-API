import { config } from 'dotenv';
import cluster from "cluster";

import {startServer} from './server';

config();

if(cluster.isPrimary) {
  const worker = cluster.fork();

  worker.on('exit', () => {
    console.log(`Worker died! Pid ${worker.process.pid}`);
  });
  worker.on('listening', () => {
    console.log(`Worker listening! Pid ${worker.process.pid}`);
  }) 
}

if(cluster.isWorker) {
  startServer();
}