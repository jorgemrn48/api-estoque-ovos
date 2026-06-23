import crypto from 'crypto';
import LoteRepository from '../repositories/lote.repository.js';
import RetiradaRepository from '../repositories/retirada.repository.js'
import VendedorRepository from '../repositories/vendedor.repository.js';
import { LoteResponseDTO } from '../dtos/lote.dto.js';

class LoteService{
    static async listarTodos(){
        const lotesFromDb = await LoteRepository.findAll();
        return lotesFromDb.map(lote => new LoteResponseDTO(lote));
    }

    static async buscarPorId(id){
        const loteFromDb = await LoteRepository.findById(id);
        if(!loteFromDb){
            const error = new Error('Lote não encontrado');
            error.statusCode = 404;
            throw error;
        }
        return new LoteResponseDTO(loteFromDb);
    }

    static async criar(dados){
        const novoLote = {
            id: crypto.randomUUID(),
            data_recebimento: dados.data_recebimento,
            valor_boleto: dados.valor_boleto,
            data_vencimento: dados.data_vencimento,
            quantidade_ovos: dados.quantidade_ovos,
            preco_nota: dados.preco_nota,
            status: "aguardando classificação",
            classificacao: {
                qtd_normal: 0,
                qtd_trincado: 0,
                qtd_pequeno: 0,
                qtd_jumbo: 0,
                qtd_desperdicio: 0
            },
            custo_unitario_normal: 0
        };
        const novoLoteFromDb = await LoteRepository.create(novoLote);
        return new LoteResponseDTO(novoLoteFromDb);
    }

    static async atualizar(id, dados) {
        const loteExistente = await LoteRepository.findById(id);
        if (!loteExistente) {
            const error = new Error('Lote não encontrado');
            error.statusCode = 404;
            throw error;
        }

        if (dados.data_recebimento) loteExistente.data_recebimento = dados.data_recebimento;
        if(dados.valor_boleto) loteExistente.valor_boleto = dados.valor_boleto;
        if(dados.data_vencimento) loteExistente.data_vencimento = dados.data_vencimento;
        if(dados.quantidade_ovos) loteExistente.quantidade_ovos = dados.quantidade_ovos;
        if(dados.preco_nota) loteExistente.preco_nota = dados.preco_nota;

        const loteAtualizado = await LoteRepository.update(loteExistente);
        return new LoteResponseDTO(loteAtualizado);
    }

    static async classificar(id, dados){
        const lote = await LoteRepository.findById(id);
        if(!lote){
            const error = new Error('Lote não encontrado');
            error.statusCode = 404;
            throw error;
        }
        const totalClassificados = (
            Number(dados.qtd_normal) + 
            Number(dados.qtd_trincado) + 
            Number(dados.qtd_pequeno) + 
            Number(dados.qtd_jumbo) + 
            Number(dados.qtd_desperdicio)
        )
        if(totalClassificados !== Number(lote.quantidade_ovos)){
            const error = new Error(`Erro de regra de negócio: a soma da classificação (${totalClassificados}) não bate com a quantidade total do lote (${lote.quantidade_ovos})`);
            error.statusCode = 400;
            throw error;
        }
        lote.classificacao.qtd_normal = Number(dados.qtd_normal);
        lote.classificacao.qtd_trincado = Number(dados.qtd_trincado);
        lote.classificacao.qtd_pequeno = Number(dados.qtd_pequeno);
        lote.classificacao.qtd_jumbo = Number(dados.qtd_jumbo);
        lote.classificacao.qtd_desperdicio = Number(dados.qtd_desperdicio);
        lote.custo_unitario_normal = Math.ceil((lote.valor_boleto / lote.classificacao.qtd_normal) * 10) / 10;
        lote.status = "ativo";

        const loteAtualizado = await LoteRepository.update(lote);
        return new LoteResponseDTO(loteAtualizado);
    }

    static async fecharLote(loteId){
        const lote = await LoteRepository.findById(loteId);
        if(!lote){
            const error = new Error('Lote não encontrado');
            error.statusCode = 404;
            throw error;
        }
        if(lote.status === 'aguardando classificação'){
            const error = new Error('Lote ainda não tem preço calculado');
            error.statusCode = 400;
            throw error;
        }
        const retiradasdoLote = await RetiradaRepository.findByLoteId(loteId);
        const vendedores = await VendedorRepository.findAll();

        const contas = [];
        
        vendedores.forEach(vendedor => {
            const retiradasVendedor = retiradasdoLote.filter(r => r.vendedor_id === vendedor.id);
            let totalNormais = 0;
            let totalTrincados = 0;
            let totalPequenos = 0;
            let totalJumbo = 0;

            retiradasVendedor.forEach(retirada => {
                totalNormais += Number(retirada.qtd_normal) || 0;
                totalTrincados += Number(retirada.qtd_trincado) || 0;
                totalPequenos += Number(retirada.qtd_pequeno) || 0;
                totalJumbo += Number(retirada.qtd_jumbo) || 0;
            });
            const valorDevidoBoleto = totalNormais * lote.custo_unitario_normal;
            if(retiradasVendedor.length > 0){
                contas.push({
                    vendedor: vendedor.nome,
                    ovos_normais_pegos: totalNormais,
                    ovos_trincados_pegos: totalTrincados,
                    ovos_pequenos_pegos: totalPequenos,
                    ovos_jumbo_pegos: totalJumbo,
                    valor_a_transferir: Number(valorDevidoBoleto.toFixed(2))
                });
            }
        });
        return{
            id_lote: lote.id,
            valor_total_boleto: lote.valor_boleto,
            custo_rateado_por_bandeja: Number(lote.custo_unitario_normal.toFixed(4)),
            relatorio_pagamento: contas
        };
    }
}

export default LoteService;