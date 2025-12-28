
import express from "express";
import dotenv from "dotenv";
import checkRoute from "./routes/check.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/check", checkRoute);

app.get('/health', (req, res) => {
  res.send('Healthy!! Healthy!!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
