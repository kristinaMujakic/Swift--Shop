/** Server for Swift Shop. */

const app = require("./app");
const { PORT } = require("./config");
require("dotenv").config();

app.listen(PORT, () => {
  console.log(`Started on http://localhost:${PORT}`);
});
