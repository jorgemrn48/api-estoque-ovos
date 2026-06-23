import mongoose from 'mongoose';

const retiradaSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    data_hora: {
        type: String,
        required: true
    },
    vendedor_id: {
        type: String,
        required: [true, 'O ID do vendedor é obrigatório']
    },
    lote_id: {
        type: String,
        required: [true, 'O ID do lote é obrigatório']
    },
    qtd_normal: {
        type: Number,
        default: 0
    },
    qtd_trincado: {
        type: Number,
        default: 0
    },
    qtd_pequeno: {
        type: Number,
        default: 0
    },
    qtd_jumbo: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    collection: 'retiradas'
});

export default mongoose.model('Retirada', retiradaSchema);