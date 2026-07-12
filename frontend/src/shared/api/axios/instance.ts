import axios from 'axios';
import { environment } from '@shared/config';

export const api = axios.create({ baseURL: environment.apiUrl });
