const express = require("express");
const router = express.Router();
const z = require("zod");
const { User } = require("../database");
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
      firstname,
      lastname,
    });

    const userid = userDB._id;
    const token = jwt.sign(
      {
        userid,
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

    const userid = user._id;
    const token = jwt.sign(
      {
        userid,
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

router.put("/", authMiddleware, async (req, res) => {
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

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = User.find({
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

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
