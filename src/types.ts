export type User = {
  username: string,
  age: string,
  hobbies: string[],
}

export type UserRequest = Partial<User>;