import express from 'express';
import {usersRouter} from './routes/users';

const app = express();

app.use(express.json())
app.use('/users', usersRouter);

app.post('/', (req, res) => {
  res.send(req.body)
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});