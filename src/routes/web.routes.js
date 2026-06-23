import express from 'express';
import LoteController from '../controllers/lote.controller.js';

const router = express.Router();

/**
 * @swagger
 * /web/relatorios/fechamento/{lote_id}:
 *  get:
 *      summary: Renderiza página HTML do relatório de fechamento do lote
 *      parameters:
 *          - in: path
 *            name: lote_id
 *            required: true
 *            description: ID do lote (UUID)
 *            schema:
 *                type: string
 *                format: uuid
 *      responses:
 *          200: 
 *              description: Página HTML do relatório renderizada com sucesso
 *              content:
 *                  text/html:
 *                      schema:
 *                          type: string
 *          404:
 *              description: Lote não encontrado
 */

//Rota de relatório:
router.get('/relatorios/fechamento/:lote_id', LoteController.renderizarRelatorioFechamento);

export default router;