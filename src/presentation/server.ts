import express, { Router } from "express";
import path from "path";

interface ServerOptions {
  port: number;
  publicPath?: string;
  routes: Router;
}
export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: ServerOptions) {
    const { port,routes, publicPath = "public" } = options;
    this.port = port;
    this.publicPath = publicPath;
    this.routes = routes;
  }

  async start() {
    //* Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));// x-www-form-urlencoded

    
    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* Routes
    this.app.use(this.routes)

    //*SPA
    this.app.get("*", (req, res) => {
      console.log(__dirname);
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
      return;
    });

    this.app.listen(this.port, () =>
      console.log("\x1b[32m%s\x1b[0m", `Server running at port ${this.port}`)
    );
  }
}
