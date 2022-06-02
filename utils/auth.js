import jwt from 'jsonwebtoken';

export function signToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}
