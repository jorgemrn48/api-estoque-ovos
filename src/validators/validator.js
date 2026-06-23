import { body } from 'express-validator';
import { verificarErros } from '../middlewares/validatorMiddleware.js';

export const regrasValidacaoVendedor = [
    body('nome')
        .trim()
        .notEmpty().withMessage("O nome é obrigatório")
        .isLength({min: 3}).withMessage("Nome precisa ter mais que 3 letras"),

    body('telefone')
        .trim()    
        .notEmpty().withMessage("O telefone é obrigatório")
        .isMobilePhone('pt-BR').withMessage("Telefone inválido"),

    body('login')
        .trim()
        .notEmpty().withMessage("O login é obrigatório")
        .isLength({min: 3}).withMessage("O login deve ter no mínimo 3 caracteres"),

    body('senha')
        .trim()
        .notEmpty().withMessage("A senha é obrigatória")
        .isLength({min: 3}).withMessage("A senha deve ter no mínimo 3 dígitos"),

    body('role')
        .trim()
        .notEmpty().withMessage("O papel é obrigatório")
        .isIn(['admin', 'vendedor']).withMessage("O papel deve ser 'admin' ou 'vendedor'"),

    verificarErros
]

export const regrasValidacaoLote = [
    body('data_recebimento')
        .trim()
        .notEmpty().withMessage("Preencha a data de recebimento do lote.")
        .isDate().withMessage("Cadastre o lote com uma data válida."),

    body('valor_boleto')
        .trim()
        .notEmpty().withMessage("Preencha o valor do boleto corretamente.")
        .isFloat({min: 0.01}).withMessage("Verifique o valor do boleto."),

    body('data_vencimento')
        .trim()
        .notEmpty().withMessage("Preencha a data de vencimento do boleto.")
        .isDate().withMessage("Cadastre uma data válida para o vencimento do boleto."),

    body('quantidade_ovos')
        .trim()
        .notEmpty().withMessage("Cadastre a quantidade total de ovos do lote")
        .isInt({min: 1}).withMessage("A quantidade deve ser um numero inteiro maior que 1"),

    body('preco_nota')
        .trim()
        .notEmpty().withMessage("Cadastre o preço do ovo na nota.")
        .isFloat({min: 0.01}).withMessage("Verifique o valor do ovo na nota."),

    verificarErros
]

export const regrasValidacaoRetirada = [
    body('vendedor_id')
        .optional()
        .trim()
        .isUUID().withMessage("ID do vendedor inválido"),

    body('lote_id')
        .trim()
        .notEmpty().withMessage("Informe o lote de onde foi feita a retirada")
        .isUUID().withMessage("ID do lote inválido."),

    body('qtd_normal')
        .trim()
        .notEmpty().withMessage("Informe a quantidade de ovos normais.")
        .isInt({min: 0}).withMessage("Informe um valor válido para a retirada."),

    body('qtd_trincado')
        .trim()
        .notEmpty().withMessage("Informe a quantidade de ovos trincados.")
        .isInt({min: 0}).withMessage("Informe um valor válido para a retirada."),
    
    body('qtd_pequeno')
        .trim()
        .notEmpty().withMessage("Informe a quantidade de ovos pequenos.")
        .isInt({min: 0}).withMessage("Informe um valor válido para a retirada."),
    
    body('qtd_jumbo')
        .trim()
        .notEmpty().withMessage("Informe a quantidade de ovos jumbo.")
        .isInt({min: 0}).withMessage("Informe um valor válido para a retirada."),

    verificarErros
]
