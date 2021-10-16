const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  res.json([                  // json 형태로 응답
    { id: 1, content: 'hello1' },
    { id: 2, content: 'hello2' },
    { id: 3, content: 'hello3' },
  ])
});

router.delete('/', (req, res) => {
  res.send({ id: 1, content: 'hello' })
});


module.exports = router;