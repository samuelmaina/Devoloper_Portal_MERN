import app from "./app";
import { connectToDb } from "./models/utils";

import { PORT, MONGO_URI } from "./config";

// app.listen(PORT,()=>{
//     console.log("Server started on port ", PORT)
// })

// export default app

connectToDb(MONGO_URI).then(() => {
  console.log("Application connected to the database");
  app.listen(PORT || 3000, () => {
    console.log("The server is running on", PORT);
  });
});

// const  { MONGO_URI, PORT } = require("./config");
// const { connectToDb } = require("./models/utils");

// let server;

// console.log("The server should be running on this port")

// connectToDb(MONGO_URI)
//   .then(() => {
//     server = app.listen(PORT);
//     console.log("App started on the PORT", PORT);
//   })
//   .catch((err:object) => console.log("This is the error",err));
