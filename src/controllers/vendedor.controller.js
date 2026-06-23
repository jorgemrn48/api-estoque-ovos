import VendedorService from "../services/vendedor.service.js";

class VendedorController{
    static async listarVendedores(req, res, next){
        try{
            const vendedores = await VendedorService.listarTodos();
            res.status(200).json(vendedores);
        } catch(error){
            next(error);
        }
    }

    static async listarVendedorPorId(req, res, next){
        try{
            const { id } = req.params;
            const vendedor = await VendedorService.buscarPorId(id);
            res.status(200).json(vendedor);
        } catch(error){
            next(error);
        }
    }

    static async cadastrarVendedor(req, res, next){
        try{
            const novoVendedor = await VendedorService.criar(req.body);
            res.status(201).json(novoVendedor);
        } catch(error){
            next(error);
        }
    }

    static async atualizarVendedor(req, res, next){
        try{
            const { id } = req.params;
            const vendedorAtualizado = await VendedorService.atualizar(id, req.body);
            res.status(200).json(vendedorAtualizado);
        } catch(error){
            next(error);
        }
    }

    static async deletarVendedor(req, res, next){
        try{
            const { id } = req.params;
            await VendedorService.deletar(id);
            res.status(204).send();
        } catch(error){
            next(error);
        }
    }
}

export default VendedorController;