import axios from 'axios';

import { API_URL } from '../shared/lib/constants/global';

const baseURL = API_URL;
const Axios = axios.create({ baseURL });

export default Axios;
