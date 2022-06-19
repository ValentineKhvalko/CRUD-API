import { createServer } from 'http';
import { env } from 'process';
import { config } from 'dotenv';

import { getAllUsers, getUser, createUser, updateUser } from './controllers/usersController';

config();

const PORT = env.PORT || 5000;

const REG_EX_API_USERS = /\/api\/users\//;

const server = createServer((req, res) => {
  if(req.url === '/api/users' && req.method === 'GET') {
    getAllUsers(req, res);

  } else if(req.url === '/api/users' && req.method === 'POST') {
    createUser(req, res);

  } else if (req.url?.indexOf('/api/users/') === 0 && req.method === 'GET') {
    const id = req.url?.replace(REG_EX_API_USERS, '');
    getUser(req, res, id);

  } else if (req.url?.indexOf('/api/users/') === 0 && req.method === 'PUT') {
    const id = req.url?.replace(REG_EX_API_USERS, '');

    updateUser(req, res, id);

  } else {
    res.writeHead(404, {'Content-Type': 'applications/json'})
    res.end(JSON.stringify({message: 'Route not found'}))
  }
  
})

server.listen(PORT, () => {
  console.log(`Server running on ${PORT} port`);
  
});