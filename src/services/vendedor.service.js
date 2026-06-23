import bcrypt from 'bcrypt';
import crypto from 'crypto';
import VendedorRepository from '../repositories/vendedor.repository.js';
import { VendedorResponseDTO } from '../dtos/vendedor.dto.js';

class VendedorService {
    static async listarTodos() {
        const vendedoresFromDb = await VendedorRepository.findAll();
        return vendedoresFromDb.map(vendedor => new VendedorResponseDTO(vendedor));
    }
    
    static async buscarPorId(id) {
        const vendedorFromDb = await VendedorRepository.findById(id);
        if (!vendedorFromDb) {
            const error = new Error('Vendedor não encontrado');
            error.statusCode = 404;
            throw error;
        }
        return new VendedorResponseDTO(vendedorFromDb);
    }

    static async criar(dados) {
        const vendedorExistente = await VendedorRepository.findByLogin(dados.login);
        if(vendedorExistente){
            const error = new Error('Já existe usuário com este login');
            error.statusCode = 409;
            throw error;
        }
        const saltRounds = 10;
        const senhaHash = await bcrypt.hash(dados.senha, saltRounds);
        const novoVendedor = {
            id: crypto.randomUUID(),
            nome: dados.nome,
            telefone: dados.telefone,
            login: dados.login,
            role: dados.role,
            senha: senhaHash
        }
        const novoVendedorFromDb = await VendedorRepository.create(novoVendedor);
        return new VendedorResponseDTO(novoVendedorFromDb);
    }

    static async atualizar(id, dados) {
        const vendedorExistente = await VendedorRepository.findById(id);
        if (!vendedorExistente) {
            const error = new Error('Vendedor não encontrado');
            error.statusCode = 404;
            throw error;
        }

        if (dados.nome) vendedorExistente.nome = dados.nome;
        if (dados.telefone) vendedorExistente.telefone = dados.telefone;

        const vendedorAtualizado = await VendedorRepository.update(vendedorExistente);
        return new VendedorResponseDTO(vendedorAtualizado);
    }

    static async deletar(id) {
        const vendedorExistente = await VendedorRepository.findById(id);
        if (!vendedorExistente) {
            const error = new Error('Vendedor não encontrado');
            error.statusCode = 404;
            throw error;
        }
        await VendedorRepository.delete(id);
    }
}

export default VendedorService;