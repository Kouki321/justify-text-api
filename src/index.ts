import express from "express";
import bodyParser from "body-parser";
import routes from "./routes"; 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming requests with JSON or plain text bodies
app.use(bodyParser.json());
app.use(bodyParser.text({ type: "text/plain" }));

app.use("/", routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
