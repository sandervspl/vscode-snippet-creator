import * as express from 'express';
import * as path from 'path';
import compress from 'compression';

const port = process.env.PORT || 3000;
const app = express();

app.use(compress());
app.use(express.static(path.resolve(__dirname, '../../dist')));

app.use((req, res) => {
  res.sendFile('/index.html');
});

app.listen(port, () => {
  console.info(`Listening on port ${port}`);
});
