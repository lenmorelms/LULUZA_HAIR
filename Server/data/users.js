import bcrypt from "bcryptjs";

const users = [
  {
    fname: "Admin",
    lname: "Admin",
    email: "admin@example.com",
    gender: "admin",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    fname: "Jon",
    lname: "Doe",
    gender: "male",
    email: "jondoe@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    fname: "Jane",
    lname: "Doe",
    gender: "female",
    email: "janedoe@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
