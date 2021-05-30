import express from 'express';
import cors from 'cors';
import db from './lowdb.js';
import validator from 'validator';
import {verify} from './password.js';
import {decodeToken, encodeToken} from './jwt.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get('/', async (_req, res) => {
  try {
    await db.read();
    const data = db.data.users;
    const users = data.map(o => {
      const {id, email, rawPassword} = o;
      return {
        id,
        email,
        password: rawPassword
      };
    });
    res.status(200).json({users});
  } catch (error) {
    res.status(500).json({error});
  }
});

app.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;
    if (!email && validator.isEmail(email)) {
      res.status(400).json({message: 'Email is empty or invalid'});
    }

    if (!password) {
      res.status(200).json({message: 'Password is empty'});
    }

    await db.read();
    const data = db.data.users;
    const isExists = data.find(o => o.email === email);
    if (isExists) {
      const hashedPassword = isExists.password;
      const verified = await verify(hashedPassword, password);
      console.log(verified);
      if (verified) {
        const token = await encodeToken({
          name: isExists.name,
          email: isExists.email
        });
        console.log(token);
        res.status(200).json({token});
      }

      res.status(400).json({message: 'Email doesn\'t exists'});
    }
  } catch (error) {
    res.status(500).json({error});
  }
});

app.get('/verify', async (req, res) => {
  try {
    const decode = await decodeToken(req.headers.authorization.replace('Bearer ', ''));
    res.status(200).json({decode});
  } catch (error) {
    res.status(500).json({error});
  }
});

app.get('/data', async (req, res) => {
  try {
    // Check if Authorization headers was provided
    if (req.headers.authorization) {
      // Check if token is valid
      const decode = await decodeToken((req.headers.authorization).replace('Bearer ', ''));
      await db.read();
      const data = db.data.users;
      const userData = data.find(o => o.email === decode.email);
      res.status(200).json({userData});
    }

    res.status(400).json({message: 'Authorization header was not set'});
  } catch (error) {
    res.status(500).json({error});
  }
});

app.listen(3000, () => console.log('Express server is running on http://localhost:3000'));
