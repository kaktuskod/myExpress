import { createServer, Server } from 'http';
import fs from 'fs';

import Router from './router';

class MyExpress {
  private httpServer:(Server|null) = null;
  private router: Router = new Router();

  public get(path: string, callback: Function): void {
    this.router.addRoute({ method: 'GET', path, callback});
  }

  public post(path: string, callback: Function): void {
    this.router.addRoute({ method: 'POST', path, callback});
  }

  public put(path: string, callback: Function): void {
    this.router.addRoute({ method: 'PUT', path, callback});
  }

  public delete(path: string, callback: Function): void {
    this.router.addRoute({ method: 'DELETE', path, callback});
  }

  public all (path: string, callback: Function): void {
    this.router.addRoute({ method: 'ALL', path, callback});
  }

  public render (filePath: string, options: (Object|Function), callback?: Function): void {
    fs.readFile(filePath, (err, data) => {
      if (err) throw err;

      if (typeof options === "function") {
        options('', data);
      } else if (callback) {
        let  html = data.toString();

        Object.entries(options).forEach( ([option, value]): void => {
          html = html.replace(`{{${option}}}`, value);
        });

        callback('', html);
      }
    });
  }

  listen(port:number):void {
    this.httpServer = createServer((req, res) => {
      this.router.dispatch(req, res);
    }).listen(port);
  }
}


export default () => new MyExpress();
