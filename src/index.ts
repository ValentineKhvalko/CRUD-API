import { createServer } from 'http';
import { config } from 'dotenv';
import { env } from 'process';

import { getAllUsers, getUser, createUser, updateUser, deleteUser } from './controllers/usersController';
import { REG_EX_API_USERS, VALID_ROUTE_LENGTH } from './constatnts';

config();
const PORT = env.PORT || 5000;

const server = createServer((req, res) => {
  const routeLength = req.url?.split('/').length || 0;
  const isValidRouteLength = routeLength <= VALID_ROUTE_LENGTH;

  if(req.url === '/api/users' && req.method === 'GET') {
    getAllUsers(req, res);

  } else if(req.url === '/api/users' && req.method === 'POST') {
    createUser(req, res);

  } else if (req.url?.indexOf('/api/users/') === 0 && isValidRouteLength && req.method === 'GET') {
    const id = req.url?.replace(REG_EX_API_USERS, '');
    getUser(req, res, id);

  } else if (req.url?.indexOf('/api/users/') === 0 && isValidRouteLength && req.method === 'PUT') {
    const id = req.url?.replace(REG_EX_API_USERS, '');

    updateUser(req, res, id);

  } else if (req.url?.indexOf('/api/users/') === 0 && isValidRouteLength && req.method === 'DELETE') {
    const id = req.url?.replace(REG_EX_API_USERS, '');

    deleteUser(req, res, id);

  } else {
    res.writeHead(404, {'Content-Type': 'applications/json'})
    res.end(JSON.stringify({message: 'Route not found'}))
  }
})

server.listen(PORT, () => {
  console.log(`Server running on ${PORT} port`);
});