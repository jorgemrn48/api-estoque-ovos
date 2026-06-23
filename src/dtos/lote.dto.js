export class LoteResponseDTO{
    constructor(lote){
        this.id = lote.id;
        this.status = lote.status;
        this.preco_nota = lote.preco_nota;
        this.data_recebimento = lote.data_recebimento;
        this.valor_boleto = lote.valor_boleto;
        this.quantidade_ovos = lote.quantidade_ovos;
        this.classificacao = lote.classificacao;
        this.custo_unitario_normal = lote.custo_unitario_normal;
    }
}