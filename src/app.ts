import { Server} from "./presentation/server"
import { envs } from './config/envs';
const main = async () => {

    const server = new Server({port:envs.PORT, publicPath: envs.PUBLIC_PATH});
    server.start();
}


(()=>{
    main();
})();

