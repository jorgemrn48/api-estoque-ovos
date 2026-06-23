import Retirada from '../models/retirada.model.js';

class RetiradaRepository{
    async findAll(role, id){
        if(role === 'admin') return await Retirada.find();
        return await Retirada.find({ vendedor_id: id });
    }
    async findById(id){
        return await Retirada.findOne({ id: id });
    }
    async findByLoteId(loteId){
        return await Retirada.find({ lote_id: loteId });
    }
    async create(novaRetirada){
        return await Retirada.create(novaRetirada);   
    }
    async update(retiradaAtualizada){
        return await Retirada.findOneAndUpdate(
            { id: retiradaAtualizada.id },
            retiradaAtualizada,
            { new: true }
        );
    }
}

export default new RetiradaRepository();