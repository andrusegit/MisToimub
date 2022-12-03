import config from "./apiConfig";
import app from "./app";

const { port } = config;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

