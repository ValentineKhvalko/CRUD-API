import { ServerResponse } from "http"

export const handleError = (res: ServerResponse) => {
  res.writeHead(500, {'Content-Type': 'applications/json'})
  res.end(JSON.stringify({message: 'Somthing went wrong'}))
}