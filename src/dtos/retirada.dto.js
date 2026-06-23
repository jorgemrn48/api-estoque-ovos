export class RetiradaResponseDTO{
    constructor(retirada){
        this.id = retirada.id;
        this.data_hora = retirada.data_hora;
        this.vendedor_id = retirada.vendedor_id;
        this.lote_id = retirada.lote_id;
        this.quantidades = {
            normal: retirada.qtd_normal,
            trincado: retirada.qtd_trincado,
            pequeno: retirada.qtd_pequeno,
            jumbo: retirada.qtd_jumbo
        };
    }
}