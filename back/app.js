const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const db = require('./models');

const passportConfig = require('./passport');

const app = express();

dotenv.config();
db.sequelize.sync()
.then(() => {
  console.log('db 연결 성공...');
})
.catch(console.error)
passportConfig();

app.use(cors({
  origin: '*',
}))
// front에서 받은 data를 해석해서 req.body에 넣어줌.
// 밑에는 form 데이터를 받을 때 필요
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

// app.user('/group', groupRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(3070, () => {
  console.log('서버 실행 중');
});