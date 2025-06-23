  import axios from 'axios';

  export const API = axios.create({
    baseURL: 'http://localhost:3001'
  });
// npx json-server --watch db.json --port 3001
