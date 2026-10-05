const express = require("express");
const cors = require("cors");
const { InferenceClient } = require("@huggingface/inference");

const app = express();

const PORT = process.env.PORT || 3000;
const HF_TOKEN = process.env.HF_TOKEN;

app.use(cors());
app.use(express.json());


// Home
app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "AI Video Maker backend is running!"
  });
});


// Health check
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    connected: true,
    message: "Backend connected!"
  });
});


// Generate video
app.post("/api/generate", async (req, res) => {

  try {

    const prompt = req.body?.prompt?.trim();

    if (!prompt) {
      return res.status(400).json({
        ok: false,
        error: "Prompt is required"
      });
    }


    if (!HF_TOKEN) {
      return res.status(500).json({
        ok: false,
        error: "HF_TOKEN is not configured on Render"
      });
    }


    console.log("Generating video for:", prompt);


    const hf = new InferenceClient(HF_TOKEN);


    const video = await hf.textToVideo({
      model: "Lightricks/LTX-Video-0.9.8-13B-distilled",
      inputs: prompt
    });


    const buffer = Buffer.from(await video.arrayBuffer());


    const base64Video = buffer.toString("base64");


    res.json({
      ok: true,
      status: "completed",
      prompt: prompt,
      video: `data:video/mp4;base64,${base64Video}`
    });


  } catch (error) {

    console.error("Video generation error:", error);

    res.status(500).json({
      ok: false,
      status: "error",
      error: error.message || "Video generation failed"
    });

  }

});


app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
