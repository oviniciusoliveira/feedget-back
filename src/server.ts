import express from "express";

import { feedBackRoutes } from "./routes";

const app = express();
app.use(express.json());
app.use(feedBackRoutes);

app.listen(3333, () => console.log("Server started on port 3333"));
