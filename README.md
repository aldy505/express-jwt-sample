# Express JWT Sample

This is an easy one

## Setup
```bash
# have nodejs version 14 or above (because I use ES Module)
$ node -v
v14.17.0

# install yarn if you haven't already
$ npm i -g yarn

# check your yarn version
$ yarn -v
1.22.10

# install required dependencies
$ yarn

# run the server
$ yarn start
Express server is running on http://localhost:3000
```

## Dependencies
```json
{
  "dependencies": {
    "argon2": "^0.27.2",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "lowdb": "^2.1.0",
    "validator": "^13.6.0"
  },
  "devDependencies": {
    "eslint": "^7.27.0",
    "eslint-config-xo-space": "^0.27.0"
  }
}
```

## Routes

* `GET /` - Fetch all data you can use to login
```js
const users = await axios.get('http://localhost:3000/')
```
* `POST /login` - Login route
```js
const login = await axios.post(
  'http://localhost:3000/login',
  {
    email: 'theemailprovided@something.com',
    password: 'this is not a very secure password'
  }
)
```
* `GET /verify` - Verify route
```js
const jwtToken = login.data.token
const verify = await axios.get(
  'http://localhost:3000/verify',
  {
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  }
)
```
* `GET /data` - Data route
```js
const jwtToken = login.data.token
const data = await axios.get(
  'http://localhost:3000/data',
  {
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  }
)
```

## License

MIT &copy; Reinaldy Rafli