import express from 'express'
import path from 'path';
interface ServerOptions {
    port: number;
    publicPath?: string;
}
export class Server {
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;

    constructor( options: ServerOptions) {
        const { port, publicPath = 'public' } = options;
        this.port = port;
        this.publicPath = publicPath;
     }

    async start() {

        //* Middlewares


        //* Public Folder
        this.app.use(express.static(this.publicPath));

        this.app.get('*',(req,res)=>{
            console.log(__dirname)
            const indexPath = path.join(__dirname,`../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
            return;
        })

        this.app.listen(this.port, () => console.log("\x1b[32m%s\x1b[0m",`Server running at http://localhost:${this.port}`));
    }
}