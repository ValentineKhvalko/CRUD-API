import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';

import { create, findAllUsers, findById, update } from '../models/usersModel';
import { UserRequest } from '../types';

export const getAllUsers = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = await findAllUsers();
    const formatedUsers = Object.entries(users).map(([id, userData]) => ({id, ...userData}))

    res.writeHead(200, {'Content-Type': 'applications/json'})
    res.end(JSON.stringify(formatedUsers))
  } catch(error) {
    console.log(error);
    
  }
}

export const getUser = async (req: IncomingMessage, res: ServerResponse, id?:string) => {
  try {
    const isValid = validate(id || '');

    if(id && isValid) {
      const user = await findById(id);
      
      if(user) {
        res.writeHead(200, {'Content-Type': 'applications/json'})
        res.end(JSON.stringify({id, ...user}))

      } else {
        res.writeHead(404, {'Content-Type': 'applications/json'})
        res.end(JSON.stringify({message: "User doesn't exist"}))

      }
    } else {
      res.writeHead(400, {'Content-Type': 'applications/json'})
      res.end(JSON.stringify({message: 'id is not valid'}))
    }
  } catch(error) {
    console.log(error);
  }
}

export const createUser = async (req: IncomingMessage, res: ServerResponse,) => {
  try {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    })

    req.on('end', async () => {      
      const { username, age, hobbies } = body ? JSON.parse(body) : {} as UserRequest;

      const isValidFields =
        username 
        && age 
        && hobbies 
        && typeof username === 'string' 
        && typeof age === 'string' 
        && Array.isArray(hobbies)
        && hobbies.every(hobby => typeof hobby === 'string');

      if(isValidFields) {
        const newUser = await create({username, age, hobbies});
  
        res.writeHead(201, {'Content-Type': 'applications/json'})
        res.end(JSON.stringify(newUser))

      } else {  
        res.writeHead(404, {'Content-Type': 'applications/json'})
        res.end(JSON.stringify({message: "User data doesn't contain required fields"}))
      }

    })
  } catch (e) {
    console.log(e);
  }
}

export const updateUser = async (req: IncomingMessage, res: ServerResponse, id?:string) => {
  try {
    const isValid = validate(id || '');

    if(id && isValid) {
      const user = await findById(id);
      
      if(user) {

        let body = '';

        req.on('data', (chunk) => {
          body += chunk.toString();
        })

        req.on('end', async () => {      
          const { username, age, hobbies } = body ? JSON.parse(body) : {} as UserRequest;

          const isValidFields =
            username 
            && age 
            && hobbies 
            && typeof username === 'string' 
            && typeof age === 'string' 
            && Array.isArray(hobbies)
            && hobbies.every(hobby => typeof hobby === 'string');

          if(isValidFields) {
            const newUser = await update(id, {username, age, hobbies});
      
            res.writeHead(200, {'Content-Type': 'applications/json'})
            res.end(JSON.stringify(newUser))

          } else {  
            res.writeHead(404, {'Content-Type': 'applications/json'})
            res.end(JSON.stringify({message: "User data doesn't contain required fields"}))
          }

        })

      } else {
        res.writeHead(404, {'Content-Type': 'applications/json'})
        res.end(JSON.stringify({message: "User doesn't exist"}))

      }
    } else {
      res.writeHead(400, {'Content-Type': 'applications/json'})
      res.end(JSON.stringify({message: 'id is not valid'}))
    }
  } catch(e) {
    console.log(e);
  } 
}