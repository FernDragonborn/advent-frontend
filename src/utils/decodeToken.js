import jsonwebtoken from 'jsonwebtoken';

export const decodeToken = token => {
  try {
    return jsonwebtoken.decode(token, process.env.JWT_PRIVATE_KEY);
  } catch (error) {
    console.log(error);
    return null;
  }
};
