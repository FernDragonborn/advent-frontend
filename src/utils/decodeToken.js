import jsonwebtoken from 'jsonwebtoken';

export const decodeToken = token => {
  try {
    return jsonwebtoken.decode(token);
  } catch (error) {
    console.log(error);
    return null;
  }
};
