const express = require('express');
const variants = require('./MOCK_DATA');

const app = express();
const router = express.Router();

app.use(express.static(__dirname + '/dist'));
app.use('/api', router);

router.get('/variants/ids', function (req, res) {
  const ids = variants.map(variant => variant.id);
  res.json(ids);
});

router.get('/variants/:id', function (req, res) {
  const variant = variants.find(variant => variant.id === +req.params.id);
  res.json(variant);
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, function () {
    console.log(`Server is up and running. Port: ${PORT}`);
});