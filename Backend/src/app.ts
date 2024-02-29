import express from 'express';
import {usersRouter} from './controllers/users';
import { authRouter } from './controllers/auth';
import { authorize } from './services/authService';



interface User {
  id: number;
  username: string;
  password: string;
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/auth', authRouter);

app.use('/users', authorize);
app.use('/users', usersRouter);

// app.post('/', (req, res) => {
//   res.send(req.body)
// })

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});