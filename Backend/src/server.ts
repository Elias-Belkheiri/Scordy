import express from 'express';
import router from './routes/servers';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/servers', router);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});