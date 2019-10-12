import { IncomingMessage, ServerResponse } from 'http';

interface Route {
  method: string,
  path: string,
  callback: Function
}

export default class Router {
  private routes: Route[] = [];

  addRoute (route: Route): void {
    const { method, path } = route;
    const index = this.routes.findIndex((r): boolean => (r.method === method && r.path === path));

    if (index === -1) {
      this.routes.push(route);
    } else {
      this.routes[index] = route;
    }
  }

  dispatch (req: IncomingMessage, res: ServerResponse): void {
    const { method, url } = req;
    const index = this.routes.findIndex((r): boolean => ((r.method === method) || (r.method === 'ALL')) && r.path === url);

    if (index !== -1) {
      this.routes[index].callback(req, res);
    } else {
      res.write('404');
      res.end();
    }
  }
}

export { IncomingMessage, ServerResponse }
