import Clientes from '../clientes.js';

class Cliente {
    async get(from = null, to = null, all = false) {
        if(!from && !to && !all) return;

        if(all) return Clientes;

        return Clientes.slice(from, to);
    }
}

export default Cliente;