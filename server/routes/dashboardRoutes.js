const router = require("express").Router();
const Transaction = require("../models/Transaction");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const data = await Transaction.find({ userId: req.user.id });

  let income = 0, expense = 0;
  let categoryMap = {};

  data.forEach(t => {
    if (t.type === "income") income += t.amount;
    else expense += t.amount;

    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });

  res.json({
    income,
    expense,
    balance: income - expense,
    categoryMap,
    transactions: data
  });
});

module.exports = router;