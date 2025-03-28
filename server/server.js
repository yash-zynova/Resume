require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT;

// Start Server

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
