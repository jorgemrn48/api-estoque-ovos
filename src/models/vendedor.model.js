import mongoose from 'mongoose';

const vendedorSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    nome: {
        type: String,
        required: [true, 'O nome é obrigatório']
    },
    telefone: {
        type: String,
        required: [true, 'O telefone é obrigatório']
    },
    login: {
        type: String,
        required: [true, 'O login é obrigatório'],
        unique: true
    },
    senha: {
        type: String,
        required: [true, 'A senha é obrigatória']
    },
    role: {
        type: String,
        required: [true, 'O papel é obrigatório']
    }
}, {
    timestamps: true,
    collection: 'vendedores'
});

export default mongoose.model('Vendedor', vendedorSchema);