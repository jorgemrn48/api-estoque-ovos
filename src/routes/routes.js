import { Router } from 'express';
import VendedorController from '../controllers/vendedor.controller.js';
import LoteController from '../controllers/lote.controller.js';
import RetiradaController from '../controllers/retirada.controller.js';
import { regrasValidacaoLote, regrasValidacaoVendedor, regrasValidacaoRetirada } from '../validators/validator.js';
import AuthController from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { checkRole } from '../middlewares/permission.middleware.js';

const router = Router();


/**
 * @swagger
 * /api/login:
 *  post:
 *      summary: Autentica um vendedor e retorna um token JWT
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          login:
 *                              type: string
 *                              example: "admin_user"
 *                          senha:
 *                              type: string
 *                              example: "123456"
 *      responses:
 *          200:
 *              description: Login bem sucedido
 *          401:
 *              description: login ou senha inválidos
 */

router.post('/login', AuthController.login);
router.use(authMiddleware);

/**
 * @swagger
 * /api/vendedores:
 *  get:
 *      summary: Retorna lista de vendedores cadastrados
 *      responses:
 *          200:
 *              description: lista de vendedores retornada com sucesso
 *  post:
 *      summary: Cadastra um novo vendedor
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          nome:
 *                              type: string
 *                              example: "Diego"
 *                          telefone:
 *                              type: string
 *                              example: "84999999999"
 *      responses:
 *          201:
 *              description: vendedor cadastrado com sucesso
 *          400:
 *              description: não foi possivel cadastrar o vendedor
 * /api/vendedores/{id}:
 *  get:
 *      summary: Busca vendedor dono do ID fornecido
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID do vendedor (ObjectID do MongoDB)
 *            schema:
 *                type: string
 *      responses:
 *          200:
 *              description: Vendedor retornado com sucesso
 *          404:
 *              description: Vendedor não encontrado
 *  patch:
 *      summary: Atualiza vendedor dono do ID fornecido
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID do vendedor (ObjectID do MongoDB)
 *            schema:
 *                type: string
 *      responses:
 *          200:
 *              description: Vendedor atualizado com sucesso
 *          404: 
 *              description: Vendedor não encontrado
 *  delete:
 *      summary: Deleta vendedor dono do ID fornecido
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID do vendedor (ObjectID do MongoDB)
 *            schema:
 *                type: string
 *      responses:
 *          204: 
 *              description: Vendedor deletado com sucesso
 *          404:
 *              description: Vendedor não encontrado
 *  
 */

//Rotas dos vendedores:
router.get('/vendedores', checkRole('admin'), VendedorController.listarVendedores);
router.get('/vendedores/:id', checkRole('admin'), VendedorController.listarVendedorPorId);
router.post('/vendedores', checkRole('admin'), regrasValidacaoVendedor, VendedorController.cadastrarVendedor);
router.patch('/vendedores/:id', checkRole('admin'), VendedorController.atualizarVendedor);
router.delete('/vendedores/:id', checkRole('admin'), VendedorController.deletarVendedor);

/**
 * @swagger
 * /api/lotes:
 *  get:
 *      summary: Retorna lista de lotes cadastrados
 *      responses:
 *          200:
 *              description: lista de lotes retornada com sucesso
 *  post:
 *      summary: Cadastra um novo lote
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          data_recebimento:
 *                              type: string
 *                              example: "2025-06-08"
 *                          valor_boleto:
 *                              type: number
 *                              example: 2000.80
 *                          data_vencimento:
 *                              type: string
 *                              example: "2025-06-12"
 *                          quantidade_ovos:
 *                              type: integer
 *                              example: 1250
 *                          preco_nota:
 *                              type: number
 *                              example: 5.50
 *      responses:
 *          201:
 *              description: lote cadastrado com sucesso
 *          400:
 *              description: não foi possível cadastrar o lote
 * /api/lotes/{id}:
 *  get:
 *      summary: Busca lote dono do ID fornecido
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID do lote (ObjectID do MongoDB)
 *            schema: 
 *                type: string
 *      responses:
 *          200:
 *              description: Lote retornado com sucesso
 *          404:
 *              description: Lote não encontrado
 *  patch: 
 *      summary: Atualiza lote dono do ID fornecido
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID do lote (ObjectID do MongoDB)
 *            schema:
 *                type: string
 *      responses:
 *          200:
 *              description: Lote atualizado com sucesso
 *          404: 
 *              description: Lote não encontrado
 * /api/lotes/{id}/classificar:
 *  patch:
 *      summary: Classifica o lote e calcula o custo unitário
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID do lote a ser classificado
 *            schema:
 *                type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      type: object
 *                      properties:
 *                          qtd_normal:
 *                              type: integer
 *                              example: 1000
 *                          qtd_trincado:
 *                              type: integer
 *                              example: 200
 *                          qtd_pequeno:
 *                              type: integer
 *                              example: 50
 *                          qtd_jumbo:
 *                              type: integer
 *                              example: 50
 *                          qtd_desperdicio:
 *                              type: integer
 *                              example: 100
 *      responses:
 *          200:
 *              description: lote classificado e ativado com sucesso
 *          400:
 *              description: a soma das classificações não bate com a quantidade total
 *          404: 
 *              description: lote não encontrado
 */

//Rotas dos lotes:
router.get('/lotes', LoteController.listarLotes);
router.get('/lotes/:id', LoteController.listarLotePorId);
router.post('/lotes', checkRole('admin'), regrasValidacaoLote, LoteController.cadastrarLote);
router.patch('/lotes/:id', checkRole('admin'), LoteController.atualizarLote);
router.patch('/lotes/:id/classificar', checkRole('admin'), LoteController.classificarLote);

/**
 * @swagger
 * /api/retiradas:
 *  get:
 *      summary: Retorna lista de retiradas cadastradas
 *      responses:
 *          200:
 *              description: lista de retiradas cadastrada com sucesso
 *  post:
 *      summary: Cadastra nova retirada
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          loteID:
 *                              type: string
 *                              example: "64f1b2c3e4d5a6b7c8d9e0f1"
 *                          qtdNormal: 
 *                              type: integer
 *                              example: 100
 *                          qtdTrincado:
 *                              type: integer
 *                              example: 50
 *                          qtdPequeno:
 *                              type: integer
 *                              example: 20
 *                          qtdJumbo:
 *                              type: integer
 *                              example: 10
 *      responses:
 *          201:
 *              description: retirada cadastrada com sucesso
 *          400: 
 *              description: não foi possível cadastrar retirada
 *          404:
 *              description: não foi possível cadastrar retirada (Lote ou Vendedor não encontrados)
 * /api/retiradas/{id}:
 *  get:
 *      summary: Busca retirada específica por ID
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID da retirada (ObjectID do MongoDB)
 *            schema:
 *                type: string
 *      responses:
 *          200:
 *              description: Retirada retornada com sucesso
 *          404: 
 *              description: Retirada não encontrada 
 *  patch:
 *      summary: Atualiza retirada dona do id fornecido
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID da retirada (ObjectID do MongoDB)
 *            schema:
 *                type: string
 *      responses:
 *          200:
 *              description: Retirada atualizada com sucesso
 *          404:
 *              description: Retirada não encontrada
 */

//Rotas das retiradas:
router.get('/retiradas', RetiradaController.listarRetiradas);
router.get('/retiradas/:id', checkRole('admin'), RetiradaController.listarRetiradaPorId);
router.patch('/retiradas/:id', checkRole('admin'), RetiradaController.atualizarRetirada);
router.post('/retiradas', regrasValidacaoRetirada, RetiradaController.cadastrarRetirada);

export default router;