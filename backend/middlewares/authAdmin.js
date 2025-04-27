// import jwt from 'jsonwebtoken'



// const authAdmin = async (req,res,next) => {
//     try{

//         const {atoken} = req.headers
//         if(!atoken){
//             return res.json({success:false,message:'Not Authorized Login Again'})

//         }
//         const token_decode = jwt.verify(atoken,process.env.JWT_SECRET )

//         if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){

//             return res.json({success:false,message:'Not Authorized Login Again'})
//         }

//         next()

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

// export default authAdmin

import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.json({ success: false, message: 'Not Authorized, Login Again' });
    }

    const token = authHeader.split(' ')[1];
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: 'Not Authorized, Login Again' });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authAdmin;

// import jwt from 'jsonwebtoken';

// const authAdmin = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.json({ success: false, message: 'Not Authorized, Login Again' });
//     }

//     const token = authHeader.split(' ')[1];
//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);

//     if (token_decode.email !== process.env.ADMIN_EMAIL) {
//       return res.json({ success: false, message: 'Not Authorized, Login Again' });
//     }

//     next();
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// export default authAdmin;

// import jwt from 'jsonwebtoken';

// const authAdmin = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
    
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ success: false, message: 'Not Authorized, Login Again' });
//     }

//     const token = authHeader.split(' ')[1];

//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//     } catch (error) {
//       return res.status(401).json({ success: false, message: error.name === 'TokenExpiredError' ? 'Session expired, please login again' : 'Invalid Token' });
//     }

//     if (decoded.email !== process.env.ADMIN_EMAIL) {
//       return res.status(401).json({ success: false, message: 'Not Authorized as Admin' });
//     }

//     next();
//   } catch (error) {
//     console.error('AuthAdmin Error:', error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// };

// export default authAdmin;


// import jwt from 'jsonwebtoken';

// const authAdmin = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.json({ success: false, message: 'Not Authorized, Login Again' });
//     }

//     const token = authHeader.split(' ')[1];
//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);

//     // Compare email and password separately
//     if (
//       token_decode.email !== process.env.ADMIN_EMAIL ||
//       token_decode.password !== process.env.ADMIN_PASSWORD
//     ) {
//       return res.json({ success: false, message: 'Not Authorized, Login Again' });
//     }

//     next();
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// export default authAdmin;




