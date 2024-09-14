const express = require("express");
const router = express.Router();
const z = require("zod");
const { User, Account } = require("../database");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, saltRounds } = require("../config");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middlewares/authMiddleware");

const signupSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  firstname: z.string(),
  lastname: z.string(),
});

const signinSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

const updateSchema = z.object({
  password: z.string().min(6).optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
});

router.get("/", authMiddleware, async (req, res) => {
  const user = await User.findOne({ _id: req.userId });
  res.status(200).json({
    message: "User Authorized",
    authenticated: true,
    name: user.firstname,
  });
});

router.post("/signup", async (req, res) => {
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(411).json({
      message: "Invalid input",
      errors: result.error.format(),
    });
  }

  const { username, password, firstname, lastname } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(411).json({
        message: "Email already taken",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const userDB = await User.create({
      username,
      password: hashedPassword,
      firstname: firstname.toLowerCase(),
      lastname: lastname.toLowerCase(),
    });

    const userId = userDB._id;

    await Account.create({
      userId,
      balance: 1 + Math.floor(Math.random() * 100000),
    });

    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );

    return res.status(201).json({
      message: "User created successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.post("/signin", async (req, res) => {
  const result = signinSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: result.error.format(),
    });
  }

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const userId = user._id;
    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );

    return res.status(200).json({
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.put("/update", authMiddleware, async (req, res) => {
  const result = updateSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  return res.status(200).json({
    message: "Updated successfully",
  });
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter.toLowerCase() || "";

  let users = await User.find({
    $or: [
      {
        firstname: {
          $regex: filter,
        },
      },
      {
        lastname: {
          $regex: filter,
        },
      },
    ],
  });

  users = users.filter((user) => {
    return req.userId != user._id;
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      _id: user._id,
    })),
  });
});

module.exports = router;
