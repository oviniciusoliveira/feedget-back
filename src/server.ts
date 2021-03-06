import express from "express";
import cors from "cors";

import { feedBackRoutes } from "./routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(feedBackRoutes);

app.listen(process.env.PORT || 3333, () => console.log("Server started on port 3333"));
