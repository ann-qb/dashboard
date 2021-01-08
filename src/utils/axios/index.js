import axios from 'axios';
import { onRequest, onRequestError } from './request';

const fetch = axios.create({});
fetch.interceptors.request.use(onRequest, onRequestError);

export default fetch;
