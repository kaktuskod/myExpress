import myExpress from './MyExpress';
import { IncomingMessage, ServerResponse } from './router';

const app = myExpress();
app.listen(8080);

app.get('/render', (req: IncomingMessage, res: ServerResponse) => {
  app.render('views/index.html', (err: any, html: string) => {
    res.write(html);
    res.end();
  });
});

app.get('/index', (req: IncomingMessage, res: ServerResponse) => {
  app.render('views/index.html', { name: "Dylan", testTEST: "ok" }, (err: any, html: string) => {
    res.write(html);
    res.end();
  });
});
