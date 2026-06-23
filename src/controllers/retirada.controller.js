import RetiradaService from '../services/retirada.service.js';

class RetiradaController{
    static async listarRetiradas(req, res, next){
        try{
            const { vendedorRole, vendedorId } = req;
    
            const retiradas = await RetiradaService.listarTodas(vendedorRole, vendedorId);
            res.status(200).json(retiradas);
        } catch(error){
            next(error);
        }
    }

    static async listarRetiradaPorId(req, res, next){
        try{
            const { id } = req.params;
            const retirada = await RetiradaService.buscarPorId(id);
            res.status(200).json(retirada);
        } catch(error){
            next(error);
        }
    }

    static async cadastrarRetirada(req, res, next){
        try{
            const dados = req.body;
            if(req.vendedorRole === 'vendedor'){
                dados.vendedor_id = req.vendedorId;
            } else if (req.vendedorRole === 'admin' && !dados.vendedor_id){
                dados.vendedor_id = req.vendedorId;
            }
            const novaRetirada = await RetiradaService.criar(dados);
            res.status(201).json(novaRetirada);
        } catch(error){
            next(error);
        }
    }

    static async atualizarRetirada(req, res, next){
        try{
            const { id } = req.params;
            const retiradaAtualizada = await RetiradaService.atualizarRetirada(id, req.body);
            res.status(200).json(retiradaAtualizada);
        } catch(error){
            next(error);
        }
    }
}

export default RetiradaController;
