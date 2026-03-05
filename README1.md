book-tutor
│
├── src
│
│── config
│     └── database.ts
│
│── controllers
│     ├── authController.ts
│     ├── bookController.ts
│     ├── issueController.ts
│     └── userController.ts
│
│── middlewares
│     ├── authMiddleware.ts
│     ├── roleMiddleware.ts
│     └── validationMiddleware.ts
│
│── models
│     ├── index.ts
│     ├── user.ts
│     ├── book.ts
│     └── issue.ts
│
│── interfaces
│     ├── userInterface.ts
│     ├── bookInterface.ts
│     └── issueInterface.ts
│
│── routes
│     ├── authRoutes.ts
│     ├── bookRoutes.ts
│     ├── issueRoutes.ts
│     └── userRoutes.ts
│
│── validators
│     ├── userValidator.ts
│     ├── bookValidator.ts
│     └── issueValidator.ts
│
│── utils
│     ├── jwt.ts
│     └── pagination.ts
│
│── migrations
│     ├── create-users.js
│     ├── create-books.js
│     └── create-issues.js
│
│── seeders
│     └── adminSeeder.js
│
│── app.ts
│── server.ts
│
├── .env
├── tsconfig.json
└── package.json

// src/config/database.ts

import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false
  }
);

// src/utils/jwt.ts

import jwt from "jsonwebtoken";

export const generateToken = (user:any) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );
};

// src/utils/pagination.ts 

import { Op } from "sequelize";

interface PaginationQuery {
  page?: string;
  limit?: string;
  sortBy?: string;
  order?: string;
  search?: string;
}

export const buildPagination = (
  query: PaginationQuery,
  searchableColumns: string[]
) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const offset = (page - 1) * limit;

  const sortBy = query.sortBy || "created_at";
  const order = query.order === "asc" ? "ASC" : "DESC";

  let where: any = {};

  if (query.search) {
    where = {
      [Op.or]: searchableColumns.map((col) => ({
        [col]: {
          [Op.like]: `%${query.search}%`,
        },
      })),
    };
  }

  return {
    limit,
    offset,
    order: [[sortBy, order]],
    where,
    page,
  };
};

// src/middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token required" });
  }

  try {

    const decoded:any = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();

  } catch {

    res.status(401).json({ message: "Invalid token" });

  }
};

//
src/middlewares/roleMiddleware.ts
export const adminOnly = (req:any,res:any,next:any)=>{

if(req.user.role !== "admin"){
return res.status(403).json({message:"Admin only"})
}

next()

}

//
src/middlewares/validationMiddleware.ts
import { validationResult } from "express-validator";

export const validate = (req:any,res:any,next:any)=>{

const errors = validationResult(req)

if(!errors.isEmpty()){

return res.status(400).json({
errors:errors.array()
})

}

next()

}

//
src/controllers/authController.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models";
import { generateToken } from "../utils/jwt";

export const register = async (req:Request,res:Response)=>{

const {name,email,password,mobile,gender,birthdate} = req.body

const exists = await User.findOne({where:{email}})

if(exists){
return res.status(400).json({message:"Email already exists"})
}

const hash = await bcrypt.hash(password,10)

const user = await User.create({
name,
email,
password:hash,
mobile,
gender,
birthdate
})

res.json(user)

}

export const login = async (req:Request,res:Response)=>{

const {email,password} = req.body

const user:any = await User.findOne({where:{email}})

if(!user){
return res.status(404).json({message:"User not found"})
}

const match = await bcrypt.compare(password,user.password)

if(!match){
return res.status(401).json({message:"Invalid credentials"})
}

const token = generateToken(user)

res.json({token})

}
//
src/controllers/bookController.ts
import { Request, Response } from "express";
import { Book } from "../models";
import { buildPagination } from "../utils/pagination";     

export const createBook = async (req:Request,res:Response)=>{

const book = await Book.create(req.body)

res.json(book)

}

export const getBooks = async (req:Request,res:Response)=>{

const {page=1,limit=10,search=""} = req.query as any

const books = await Book.findAndCountAll({

where:{
title:{[require("sequelize").Op.like]:`%${search}%`}
},

limit:Number(limit),
offset:(page-1)*limit

})

res.json(books)

}

export const getBooks = async (req: Request, res: Response) => {

  const { limit, offset, order, where, page } = buildPagination(
    req.query,
    ["title", "author", "status"]
  );

  const books = await Book.findAndCountAll({
    where,
    limit,
    offset,
    order,
  });

  res.json({
    total: books.count,
    page,
    totalPages: Math.ceil(books.count / limit),
    data: books.rows,
  });
};

export const updateBook = async (req:Request,res:Response)=>{

const {id} = req.params

await Book.update(req.body,{where:{id}})

res.json({message:"updated"})

}

export const deleteBook = async (req:Request,res:Response)=>{

const {id} = req.params

await Book.destroy({where:{id}})

res.json({message:"deleted"})

// GET /books?page=1&limit=5&search=harry&sortBy=title&order=ascGET /books?page=1&limit=5&search=harry&sortBy=title&order=asc

}

//
src/controllers/issueController.ts

import { Request, Response } from "express";
import { Issue } from "../models";

export const issueBook = async (req:any,res:Response)=>{

const userId = req.user.id
const {bookId} = req.body

const count = await Issue.count({
where:{userId,returnDate:null}
})

if(count >= 3){
return res.status(400).json({message:"Max 3 books allowed"})
}

const issue = await Issue.create({
userId,
bookId
})

res.json(issue)

}

export const returnBook = async (req:Request,res:Response)=>{

const {id} = req.params

await Issue.update(
{ returnDate:new Date() },
{ where:{id} }
)

res.json({message:"returned"})

}

export const myBooks = async (req:any,res:Response)=>{

const books = await Issue.findAll({
where:{userId:req.user.id}
})

res.json(books)

}

// src/controllers/userController.ts

import { Request, Response } from "express";
import { User, Issue, Book } from "../models";
import { buildPagination } from "../utils/pagination";

/*
GET ALL USERS
Admin only
Search + Sort + Pagination
*/

export const getUsers = async (req: Request, res: Response) => {
  try {

    const { limit, offset, order, where, page } = buildPagination(
      req.query,
      ["name", "email", "mobile", "status"]
    );

    const users = await User.findAndCountAll({
      where,
      limit,
      offset,
      order,
      attributes: { exclude: ["password"] }
    });

    res.json({
      total: users.count,
      page,
      totalPages: Math.ceil(users.count / limit),
      data: users.rows
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

---

/*
GET USER WITH ISSUED BOOKS
Admin only
*/

export const getUserWithBooks = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Issue,
          as: "issues",
          include: [
            {
              model: Book,
              as: "book"
            }
          ]
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

---

/*
UPDATE USER
Admin can edit user details
*/

export const updateUser = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.update(req.body);

    res.json({
      message: "User updated",
      data: user
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

---

/*
UPDATE USER STATUS
active / inactive
*/

export const updateUserStatus = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;
    const { status } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = status;

    await user.save();

    res.json({
      message: "User status updated"
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

---

/*
SOFT DELETE USER
*/

export const deleteUser = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy(); // paranoid true -> soft delete

    res.json({
      message: "User deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// src/routes/userRoutes.ts

import express from "express";
import {
  getUsers,
  getUserWithBooks,
  updateUser,
  updateUserStatus,
  deleteUser
} from "../controllers/userController";

import { authenticate } from "../middlewares/authMiddleware";
import { adminOnly } from "../middlewares/roleMiddleware";

const router = express.Router();

router.get("/", authenticate, adminOnly, getUsers);

router.get("/:id", authenticate, adminOnly, getUserWithBooks);

router.put("/:id", authenticate, adminOnly, updateUser);

router.patch("/:id/status", authenticate, adminOnly, updateUserStatus);

router.delete("/:id", authenticate, adminOnly, deleteUser);

export default router;

//
src/routes/authRoutes.ts

import express from "express";
import { register,login } from "../controllers/authController";
import { registerValidator,loginValidator } from "../validators/userValidator";
import { validate } from "../middlewares/validationMiddleware";

const router = express.Router();

router.post(
"/register",
registerValidator,
validate,
register
);

router.post(
"/login",
loginValidator,
validate,
login
);

export default router;

//
src/routes/bookRoutes.ts

import express from "express";
import { createBook,updateBook,getBooks,deleteBook } from "../controllers/bookController";
import { authenticate } from "../middlewares/authMiddleware";
import { adminOnly } from "../middlewares/roleMiddleware";
import { bookCreateValidator,bookUpdateValidator } from "../validators/bookValidator";
import { validate } from "../middlewares/validationMiddleware";

const router = express.Router();

router.post(
"/",
authenticate,
adminOnly,
bookCreateValidator,
validate,
createBook
);

router.put(
"/:id",
authenticate,
adminOnly,
bookUpdateValidator,
validate,
updateBook
);

router.get("/",authenticate,getBooks);

router.delete("/:id",authenticate,adminOnly,deleteBook);

export default router;

//
src/routes/issueRoutes.ts

import express from "express";
import { issueBook,returnBook,myBooks } from "../controllers/issueController";
import { authenticate } from "../middlewares/authMiddleware";
import { issueBookValidator } from "../validators/issueValidator";
import { validate } from "../middlewares/validationMiddleware";

const router = express.Router();

router.post(
"/",
authenticate,
issueBookValidator,
validate,
issueBook
);

router.put(
"/return/:id",
authenticate,
returnBook
);

router.get(
"/my",
authenticate,
myBooks
);

export default router;

//
src/app.ts

import express from "express"
import authRoutes from "./routes/authRoutes"
import bookRoutes from "./routes/bookRoutes"
import issueRoutes from "./routes/issueRoutes"
import userRoutes from "./routes/userRoutes";

const app = express()

app.use(express.json())

app.use("/auth",authRoutes)
app.use("/books",bookRoutes)
app.use("/issues",issueRoutes)
app.use("/users", userRoutes);

export default app

//
src/server.ts
import app from "./app"
import { sequelize } from "./config/database"

sequelize.sync().then(()=>{

app.listen(3000,()=>{
console.log("server running")
})

})

//src/migrations/create-users.js

module.exports = {

up: async (queryInterface,Sequelize)=>{

await queryInterface.createTable("users",{

id:{
type:Sequelize.UUID,
primaryKey:true
},

name:Sequelize.STRING,
email:Sequelize.STRING,
password:Sequelize.STRING,
mobile:Sequelize.STRING,
gender:Sequelize.STRING,
birthdate:Sequelize.DATEONLY,
status:Sequelize.STRING,
role:Sequelize.STRING,

created_at:Sequelize.DATE,
updated_at:Sequelize.DATE,
deleted_at:Sequelize.DATE

})

},

down: async(queryInterface)=>{

await queryInterface.dropTable("users")

}

}

//
src/seeders/adminSeeder.js

const bcrypt = require("bcryptjs")

module.exports = {

up: async(queryInterface)=>{

const password = await bcrypt.hash("admin123",10)

await queryInterface.bulkInsert("users",[

{
id:"1",
name:"Admin",
email:"admin@test.com",
password,
role:"admin",
created_at:new Date(),
updated_at:new Date()
}

])

},

down: async(queryInterface)=>{

await queryInterface.bulkDelete("users",null,{})

}

}

src
 ├── validators
 │     ├── userValidator.ts
 │     ├── bookValidator.ts
 │     └── issueValidator.ts

src/validators/userValidator.ts

import { body } from "express-validator";

export const registerValidator = [

  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("mobile")
    .optional()
    .isMobilePhone("any")
    .withMessage("Invalid mobile number"),

  body("gender")
    .isIn(["male","female","other"])
    .withMessage("Invalid gender"),

  body("birthdate")
    .isDate()
    .withMessage("Birthdate must be date")

]

export const loginValidator = [

  body("email")
    .isEmail()
    .withMessage("Valid email required"),

  body("password")
    .notEmpty()
    .withMessage("Password required")

]

src/validators/bookValidator.ts

import { body } from "express-validator";

export const bookCreateValidator = [

body("title")
.notEmpty()
.withMessage("Title required"),

body("author")
.notEmpty()
.withMessage("Author required"),

body("quantity")
.isInt({ min:1 })
.withMessage("Quantity must be number"),

body("description")
.optional()

]

export const bookUpdateValidator = [

body("title")
.optional()
.notEmpty(),

body("author")
.optional()
.notEmpty(),

body("quantity")
.optional()
.isInt({min:1})

]

src/validators/issueValidator.ts

import { body } from "express-validator";

export const issueBookValidator = [

body("bookId")
.notEmpty()
.withMessage("Book ID required")

]

// install

npm install express sequelize mysql2 jsonwebtoken bcryptjs dotenv cors express-validator

npm install -D typescript ts-node-dev @types/node @types/express @types/jsonwebtoken @types/bcryptjs sequelize-cli

