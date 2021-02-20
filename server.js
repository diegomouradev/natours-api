const app = require('./app');

const port = 3000;
app.listen(port, () => {
  console.log(`listening to changes at port: 127.0.0.1:${port}`);
});
