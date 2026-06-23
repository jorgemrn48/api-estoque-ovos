import Lote from '../models/lote.model.js';

class LoteRepository{
    async findAll(){
        return await Lote.find();
    }
    async findById(id){
        return await Lote.findOne({ id: id });
    }
    async create(novoLote){
        return await Lote.create(novoLote);
    }
    async update(loteAtualizado){
        return await Lote.findOneAndUpdate(
            { id: loteAtualizado.id },
            loteAtualizado,
            { new: true }
        );
    }
    async delete(id){
        const result = await Lote.findOneAndDelete({ id: id });
        return result !== null;
    }
}

export default new LoteRepository();