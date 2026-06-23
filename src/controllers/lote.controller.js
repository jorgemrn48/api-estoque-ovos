import LoteService from '../services/lote.service.js';

class LoteController{
    static async listarLotes(req, res, next){
        try{
            const lotes = await LoteService.listarTodos();
            res.status(200).json(lotes);
        } catch(error){
            next(error);
        }
    }

    static async listarLotePorId(req, res, next){
        try{
            const { id } = req.params;
            const lote = await LoteService.buscarPorId(id);
            res.status(200).json(lote);
        } catch(error){
            next(error);
        }
    }

    static async cadastrarLote(req, res, next){
        try{
            const novoLote = await LoteService.criar(req.body);
            res.status(201).json(novoLote);
        } catch(error){
            next(error);
        }
    }

    static async deletarLote(req, res, next){
        try{
            const { id } = req.params;
            await LoteService.deletar(id);
            res.status(204).send();
        } catch(error){
            next(error);
        }
    }

    static async atualizarLote(req, res, next){
        try{
            const { id } = req.params;
            const loteAtualizado = await LoteService.atualizar(id, req.body);
            res.status(200).json(loteAtualizado);
        } catch(error){
            next(error);
        }
    }

    static async classificarLote(req, res, next){
        try{
            const { id } = req.params;
            const loteClassificado = await LoteService.classificar(id, req.body);
            res.status(200).json(loteClassificado);
        } catch(error){
            next(error);
        }
    }

    static async fecharLote(req, res, next){
        try{
            const { lote_id } = req.params;
            const relatorio = await LoteService.fecharLote(lote_id);
            res.status(200).json(relatorio);
        } catch(error){
            next(error);
        }
    }

    static async renderizarRelatorioFechamento(req, res, next){
        try{
            const { lote_id } = req.params;
            const relatorio = await LoteService.fecharLote(lote_id);
            
            res.render('relatorio', {
                title: 'Acerto de Contas do Lote',
                relatorio: relatorio 
            });
        } catch(error){
            res.status(error.statusCode || 500).send(`
                <div style="font-family: Arial; padding: 20px; text-align: center;">
                    <h1 style="color: red;">Erro ao gerar relatório</h1>
                    <h2>${error.message}</h2>
                    <a href="javascript:history.back()">Voltar</a>
                </div>
            `);
        }
    }
}



export default LoteController;