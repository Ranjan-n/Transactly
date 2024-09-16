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
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({
      message: "User Authorized",
      authenticated: true,
      name: user.firstname,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/signup", async (req, res) => {
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: result.error.format(),
    });
  }

  const { username, password, firstname, lastname } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
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

    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      message: "User created successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
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
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/update", authMiddleware, async (req, res) => {
  const result = updateSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Error while updating information",
      errors: result.error.format(),
    });
  }

  try {
    const updateData = req.body;
    if (updateData.password) {
      updateData.password = bcrypt.hashSync(updateData.password, saltRounds);
    }

    await User.updateOne({ _id: req.userId }, updateData);
    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = (req.query.filter || "").toLowerCase();

  try {
    let users = await User.find({
      $or: [
        { firstname: { $regex: filter, $options: "i" } },
        { lastname: { $regex: filter, $options: "i" } },
      ],
    });

    users = users.filter(
      (user) => user._id.toString() !== req.userId.toString()
    );

    res.json({
      user: users.map((user) => ({
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        _id: user._id,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
