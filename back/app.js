const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('hello express')  // 문자열을 응답한 것
});

app.get('/api', (req, res) => {
  res.send('hello api')
});

app.get('/api/posts', (req, res) => {
  res.json([                  // json 형태로 응답
    { id: 1, content: 'hello1' },
    { id: 2, content: 'hello2' },
    { id: 3, content: 'hello3' },
  ])
});

app.post('/api/post', (req, res) => {
  res.send({ id: 1, content: 'hello' })
});

app.delete('/api/post', (req, res) => {
  res.send({ id: 1 })
});

app.listen(3065, () => {
  console.log('서버 실행 중');
});