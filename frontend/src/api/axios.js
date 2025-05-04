// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: `https://af-2-it-22888952.vercel.app/api`, 
});

export default instance;
