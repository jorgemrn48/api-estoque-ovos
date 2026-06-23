import Vendedor from '../models/vendedor.model.js';

class VendedorRepository{
    //Buscando os vendedores no banco de dados:
    async findAll(){
        return await Vendedor.find();
    }
    //Buscando vendedor específico por ID:
    async findById(id){
        return await Vendedor.findOne({ id: id });
    }
    //Buscando vendedor específico por login:
    async findByLogin(login){
        return await Vendedor.findOne({ login: login });
    }
    //Inserindo novo vendedor:
    async create(novoVendedor){
        return await Vendedor.create(novoVendedor);
    }
    //Atualizando dados de vendedor existente:
    async update(vendedorAtualizado){
        return await Vendedor.findOneAndUpdate(
            { id: vendedorAtualizado.id },
            vendedorAtualizado,
            { new: true }
        );
    }
    //Removendo vendedor do banco de dados:
    async delete(id){
        const result = await Vendedor.findOneAndDelete({ id: id });
        return result !== null;
    }
}

export default new VendedorRepository();