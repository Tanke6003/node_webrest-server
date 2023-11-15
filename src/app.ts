import { Server} from "./presentation/server"
import { envs } from './config/envs';
import { Routes } from "./presentation/routes";



const main = async () => {
    const server = new Server({port:envs.PORT,routes:Routes.routes,publicPath: envs.PUBLIC_PATH});
    server.start();
}


(()=>{
    main();
})();

