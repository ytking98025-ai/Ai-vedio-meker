const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "AI Video Maker backend is running!"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    connected: true,
    message: "Backend connected!"
  });
});

app.post("/api/generate", (req, res) => {

  const prompt = req.body?.prompt;

  if (!prompt) {
    return res.status(400).json({
      ok: false,
      error: "Prompt is required"
    });
  }

  res.json({
    ok: true,
    status: "received",
    prompt: prompt
  });

});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
