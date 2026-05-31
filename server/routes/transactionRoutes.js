const router = require("express").Router();
const Transaction = require("../models/Transaction");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const data = await Transaction.create({
    ...req.body,
    userId: req.user.id
  });

  res.json(data);
});

router.get("/", auth, async (req, res) => {
  const data = await Transaction.find({ userId: req.user.id });
  res.json(data);
});

router.delete("/:id", auth, async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;