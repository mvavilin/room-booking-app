import axios from 'axios';
import { environment } from '@shared/config/environment';

export const api = axios.create({
  baseURL: environment.apiUrl,
});
