import express from 'express';
import {usersRouter} from './routes/users';
import {serversRouter} from './routes/servers';

const app = express();

app.use(express.json())
app.use('/users', usersRouter);
app.use('/servers', serversRouter);

app.post('/', (req, res) => {
  res.send(req.body)
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});