import jwt from 'jsonwebtoken';

const authTutor = async (req, res, next) => {
  try {
    const dtoken = req.headers.dtoken || req.headers.authorization;

    if (!dtoken) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Login again.' });
    }

    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.wonId = decoded.id; 

    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export default authTutor;






