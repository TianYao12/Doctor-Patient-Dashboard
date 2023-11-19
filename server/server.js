const PORT = process.env.PORT ?? 8000;

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
