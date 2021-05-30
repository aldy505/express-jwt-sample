import * as argon2 from 'argon2';

export async function hash(password) {
  try {
    const hash = await argon2.hash(password);
    return Promise.resolve(hash);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function verify(hashed, plain) {
  try {
    const verify = await argon2.verify(hashed, plain);
    return Promise.resolve(verify);
  } catch (error) {
    return Promise.reject(error);
  }
}
