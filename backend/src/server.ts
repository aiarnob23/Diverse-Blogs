import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";


async function main() {
  try {
    await mongoose.connect(config.db_uri as string);
    app.listen(4000, () => {
      console.log(`Server is running on port 4000`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();