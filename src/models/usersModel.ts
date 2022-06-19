import { users } from "../data/users";
import { User } from "../types";

import { v4 as uuidv4 } from 'uuid';

export const findAllUsers = ():Promise<typeof users> => (
  new Promise((resolve) => {
    resolve(users);
  })
)

export const findById = (id:string):Promise<User | undefined> => (
  new Promise((resolve) => {
    resolve(users[id]);
  })
)

export const create = (user: User) => (
  new Promise((resolve) => {
    const id = uuidv4();
    users[id] = user;
    resolve({id, ...user});
  })
)

export const update = (id: string, user:User) => (
  new Promise((resolve) => {
    users[id] = user;
    resolve({id, ...user})
  })
)

export const deleteRecord = (id: string):Promise<void> => (
  new Promise((resolve) => {
    delete users[id];
    resolve()
  })
) 