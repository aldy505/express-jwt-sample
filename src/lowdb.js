import {resolve, dirname} from 'path';
import {JSONFile, Low} from 'lowdb';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const adapter = new JSONFile(resolve(__dirname, './users.json'));
const db = new Low(adapter);

export default db;
