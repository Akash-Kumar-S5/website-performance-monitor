import express from 'express';
const app = express();
const port = 4200;

app.get('/check', (req, res) => {
  res.send('Healthy!! Healthy!!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});