import express from "express";
import cors from "cors";

import routes from "./src/routes";

import swagger from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.use("/docs", swagger.serve, swagger.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
