import fake from 'faker';

class Product {
    async get(limit = null, all = false) {

        if(!limit && !all) return;

        const DEFAULT_LIMIT = limit || 20000;

        const produtos = Array.from({
            length: DEFAULT_LIMIT,
        }, (_, index) => index).map(index => ({
            "pro_codigo": index +1,
            "pro_descricao": fake.commerce.product(),
            "estoque": fake.random.number(100),
            "valor": fake.random.float(200),
            "fotos": [
                fake.image.food(),
                fake.image.food(),
            ]
        }));
        
        return produtos;
    }
}

export default Product;