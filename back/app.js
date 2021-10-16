const express = require('express');
const cors = require('cors')
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const db = require('./models');

const app = express();

db.sequelize.sync()
.then(() => {
  console.log('db 연결 성공...');
})
.catch(console.error)

app.use(cors({
  origin: '*',
}))
// front에서 받은 data를 해석해서 req.body에 넣어줌.
// 밑에는 form 데이터를 받을 때 필요
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.user('/group', groupRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(3070, () => {
  console.log('서버 실행 중');
});