import chalk from "chalk";
import app from "./app";

import db from "./database";
app.listen(8080, async () => {
  console.log(chalk.green("Server is running on port 8080"));
  await db;
});
