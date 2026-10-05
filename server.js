const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "AI Video Maker backend is running"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    status: "online"
  });
});

app.post("/api/analyze", (req, res) => {
  const { youtubeUrl } = req.body || {};

  if (!youtubeUrl) {
    return res.status(400).json({
      ok: false,
      error: "YouTube link is required"
    });
  }

  res.json({
    ok: true,
    youtubeUrl,
    status: "received"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
