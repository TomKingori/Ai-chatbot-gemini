const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3300;
const API_KEY = process.env.GEMINI_API_KEY;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(API_KEY);

app.post("/chat", async (req, res) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const chat = model.startChat({
    history: req.body.history,
  });
  const msg = req.body.message;
  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();
  res.send(text);
});

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
