// Core
import { getFullApiUrl } from 'instruments';

const GROUP_ID = 'muigd1gnahf3';
const TOKEN = 'o0h2dszdyy';
const url = 'https://lab.lectrum.io/react/api';
const api = getFullApiUrl(url, GROUP_ID);

export { GROUP_ID, TOKEN, api, url };
