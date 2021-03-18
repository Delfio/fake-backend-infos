import { createServer } from 'http';
import 'dotenv/config.js'
import { URLSearchParams } from 'url';
import clientes from './services/clientes.js';
import products from './services/products.js';


const Cliente = new clientes();
const Produto = new products();

const routes = {
    "/clientes": async (params) => {

        const urlParams = new URLSearchParams(params);
        const from = urlParams.get('from') || null;
        const to = urlParams.get('to') || null;
        const all = urlParams.get('all') || false;

        const clientes = await Cliente.get(from, to, all);
        
        return {
            status: 200,
            clientes
        }
    },
    "/produtos": async (params = null) => {
        const urlParams = new URLSearchParams(params);
        const limit = urlParams.get('limit') || null;
        const all = urlParams.get('all') || false;

        const allProducts = await Produto.get(limit, all);

        return {
            status: 200,
            products: allProducts
        }
    },

    "default": async (params = null) => {
        return {
            status: 404,
            message: "metodo não implementado",
            endpoints: {
                clientes: "/clientes?from=x&to=y",
                "all-clientes": "/clientes?all",
                products: "/produtos?limit=x",
                'all-products': "/produtos?all"
            }
        }
    },
}

createServer(async (req, res) => {
    const { url } = req;
    const [route, urlSearch] = url.split('?');
    
    const defaultRoute = routes[route] || routes["default"];


    const response = await defaultRoute(urlSearch);


    res.writeHead(response.status);
    
    delete response.status;
    
    res.write(JSON.stringify(response));
    res.end();
}).listen(process.env.PORT, () => console.log(`🚀 server running at port ${process.env.PORT}`));
