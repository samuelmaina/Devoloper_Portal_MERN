import app from "./app";
import { PORT } from "./config";

app.listen(PORT || 3000, () => {
  console.log("The server is running on", PORT);
});
