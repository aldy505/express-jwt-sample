import jwt from 'jsonwebtoken';
import validator from 'validator';
import constants from './constants.js';

export async function encodeToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      constants.JWT_SECRET_KEY,
      {
        issuer: constants.JWT_ISSUER,
        expiresIn: '1 hour',
        audience: constants.JWT_AUDIENCE
      },
      (err, token) => {
        if (err) {
          return reject(err);
        }

        return resolve(token);
      }
    );
  });
}

export async function decodeToken(token) {
  return new Promise((resolve, reject) => {
    if (validator.isJWT(token)) {
      jwt.verify(
        token,
        constants.JWT_SECRET_KEY,
        {
          issuer: constants.JWT_ISSUER
        },
        (error, decoded) => {
          if (error) {
            return reject(error);
          }

          return resolve(decoded);
        }
      );
    }

    reject(new Error('Token provided is not a JWT token'));
  });
}
