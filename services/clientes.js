import { readFile } from 'fs/promises';

class Cliente {
    constructor(path) {
        this.path = path
    };

    async get(from = null, to = null, all = false) {
        if(!from && !to && !all) return;

        
        const file = await readFile(this.path, 'utf-8');

        const parserFile = JSON.parse(file)

        if(all) return parserFile;

        return parserFile.slice(from, to);
    }
}

export default Cliente;