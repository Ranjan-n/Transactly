const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { Account } = require("../database");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const user = await Account.findOne({
    userId: req.userId,
  });

  return res.status(200).json({
    balance: user.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { amount, to } = req.body;

    const user = await Account.findOne({
      userId: req.userId,
    }).session(session);

    if (!user || user.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient Balance",
      });
    }

    const toAccount = await Account.findOne({
      userId: to,
    }).session(session);

    if (!toAccount) {
      session.abortTransaction();
      return res.status(400).json({
        message: "Invalid Destination account",
      });
    }

    await Account.updateOne(
      { userId: req.userId },
      {
        $inc: {
          balance: -amount,
        },
      }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      {
        $inc: {
          balance: amount,
        },
      }
    ).session(session);

    session.commitTransaction();

    return res.status(200).json({
      message: "Transaction Successful",
    });
  } catch (error) {
    console.error(error);
    session.abortTransaction();
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});
module.exports = router;
