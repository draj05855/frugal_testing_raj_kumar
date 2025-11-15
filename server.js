const express = require("express");
const app = express();

app.use(express.json());

// Simple backend validation simulation
app.post("/register", (req, res) => {
  const { firstName, lastName, email } = req.body;

  if (!firstName || !lastName || !email) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields",
    });
  }

  return res.json({
    success: true,
    message: "Registered successfully (Mock API).",
  });
});

app.listen(3000, () => {
  console.log("Mock backend running at: http://localhost:3000");
});
