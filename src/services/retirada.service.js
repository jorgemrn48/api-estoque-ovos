import crypto from 'crypto';
import RetiradaRepository from '../repositories/retirada.repository.js';
import LoteRepository from '../repositories/lote.repository.js';
import { RetiradaResponseDTO } from '../dtos/retirada.dto.js';

class RetiradaService{
    static async listarTodas(role, id){
        const retiradasFromDb = await RetiradaRepository.findAll(role, id);
        return retiradasFromDb.map(retirada => new RetiradaResponseDTO(retirada));
    }
    
    static async buscarPorId(id){
        const retiradaFromDb = await RetiradaRepository.findById(id);
        if(!retiradaFromDb){
            const error = new Error('Retirada não encontrada');
            error.statusCode = 404;
            throw error;
        }
        return new RetiradaResponseDTO(retiradaFromDb);
    }

    static async criar(dados){
        const lote = await LoteRepository.findById(dados.lote_id);
        if(!lote){
            const error = new Error("Lote não encontrado");
            error.statusCode = 404;
            throw error;
        }
        if(lote.status !== "ativo"){
            const error = new Error(`Operação negada. Lote atual encontra-se ${lote.status}`);
            error.statusCode = 400;
            throw error;
        }

        const qtdNormal = dados.qtd_normal || 0;
        const qtdTrincado = dados.qtd_trincado || 0;
        const qtdPequeno = dados.qtd_pequeno || 0;
        const qtdJumbo = dados.qtd_jumbo || 0;

        if(qtdNormal > lote.classificacao.qtd_normal){
            const error = new Error(`Estoque insuficiente de ovos normais. Saldo disponível: ${lote.classificacao.qtd_normal}`);
            error.statusCode = 400;
            throw error;
        }
        if(qtdTrincado > lote.classificacao.qtd_trincado){
            const error = new Error(`Estoque insuficiente de ovos trincados. Saldo disponível: ${lote.classificacao.qtd_trincado}`);
            error.statusCode = 400;
            throw error;
        }
        if(qtdPequeno > lote.classificacao.qtd_pequeno){
            const error = new Error(`Estoque insuficiente de ovos pequenos. Saldo disponível: ${lote.classificacao.qtd_pequeno}`);
            error.statusCode = 400;
            throw error;
        }
        if(qtdJumbo > lote.classificacao.qtd_jumbo){
            const error = new Error(`Estoque insuficiente de ovos jumbo. Saldo disponível: ${lote.classificacao.qtd_jumbo}`);
            error.statusCode = 400;
            throw error;
        }

        lote.classificacao.qtd_normal -= qtdNormal;
        lote.classificacao.qtd_trincado -= qtdTrincado;
        lote.classificacao.qtd_pequeno -= qtdPequeno;
        lote.classificacao.qtd_jumbo -= qtdJumbo;

        const totalOvosRestantes = lote.classificacao.qtd_normal + 
                                   lote.classificacao.qtd_trincado + 
                                   lote.classificacao.qtd_pequeno + 
                                   lote.classificacao.qtd_jumbo;


        if(totalOvosRestantes === 0) lote.status = "esgotado";

        await LoteRepository.update(lote);
        const novaRetirada = {
            id: crypto.randomUUID(),
            data_hora: new Date().toISOString(),
            vendedor_id: dados.vendedor_id,
            lote_id: dados.lote_id,
            qtd_normal: dados.qtd_normal,
            qtd_trincado: dados.qtd_trincado,
            qtd_pequeno: dados.qtd_pequeno,
            qtd_jumbo: dados.qtd_jumbo
        };
        const novaRetiradaFromDb = await RetiradaRepository.create(novaRetirada);
        return new RetiradaResponseDTO(novaRetiradaFromDb);
    }
}

export default RetiradaService;