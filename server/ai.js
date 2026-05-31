const express = require("express");
const router = express.Router();
require("dotenv").config();

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/insights", async (req, res) => {
  try {
    const { expenses } = req.body;

    if (!expenses || expenses.length === 0) {
      return res.json({ insight: "No data available yet." });
    }

    const prompt = `
You are a smart financial AI.

User expenses:
${JSON.stringify(expenses)}

Give:
- Spending behavior
- Overspending category
- Advice
- Next month prediction (₹ amount)

Keep it short.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({
      insight: response.choices[0].message.content,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "AI failed" });
  }
});

module.exports = router;