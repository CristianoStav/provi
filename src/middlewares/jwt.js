import 'dotenv/config';
import jwt from 'jsonwebtoken';

export default function verifyToken(req, res, next) {
  const { access_token } = req.body;

  try {
    jwt.verify(access_token, process.env.SECRET);

    const decoded = jwt.decode(access_token);

    req.token = decoded;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ err: error.message });
  }
}
