import mongoose from 'mongoose';

const loteSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    data_recebimento: {
        type: String,
        required: [true, 'A data de recebimento é obrigatória']
    },
    valor_boleto: {
        type: Number,
        required: [true, 'O valor do boleto é obrigatório']
    },
    data_vencimento: {
        type: String,
        required: [true, 'A data de vencimento é obrigatória']
    },
    quantidade_ovos: {
        type: Number,
        required: [true, 'A quantidade total de ovos é obrigatória']
    },
    preco_nota: {
        type: Number,
        required: [true, 'O preço da nota é obrigatório']
    },
    status: {
        type: String,
        enum: ['aguardando classificação', 'ativo', 'esgotado'],
        default: 'aguardando classificação'
    },
    classificacao: {
        qtd_normal: { type: Number, default: 0 },
        qtd_trincado: { type: Number, default: 0 },
        qtd_pequeno: { type: Number, default: 0 },
        qtd_jumbo: { type: Number, default: 0 },
        qtd_desperdicio: { type: Number, default: 0 }
    },
    custo_unitario_normal: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    collection: 'lotes'
});

export default mongoose.model('Lote', loteSchema);