import jwt from 'jsonwebtoken';
import env from '../utils/validateEnv.js';

export function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (token == null) throw 'Forbidden';

    jwt.verify(token, env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } catch (err) {
    res.status(401).json({ message: 'Forbidden' });
  }
}
