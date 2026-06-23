import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import VendedorRepository from '../repositories/vendedor.repository.js';

class AuthController {
    static async login(req, res, next) {
        try {
            const { login, senha } = req.body;

            //Buscando o vendedor pelo login fornecido
            const vendedor = await VendedorRepository.findByLogin(login);

            //Verificando se o vendedor existe e se a senha confere
            if (!vendedor) {
                return res.status(401).json({ mensagem: "Login ou senha inválidos." });
            }

            //Verificação da senha:
            const senhaValida = await bcrypt.compare(senha, vendedor.senha);
            if(!senhaValida){
                return res.status(401).json({mensagem: "Login ou senha inválidos."});
            }

            //Gerarndo o token JWT
            const secret = "CHAVE_SECRETA_DISTRIBUIDORA_OVOS"; 
            
            const payload = {
                id: vendedor.id,
                login: vendedor.login,
                nome: vendedor.nome,
                role: vendedor.role
            }

            const token = jwt.sign(
                payload,
                secret,
                {expiresIn: '1h'}
            );

            //Retornando o token para o cliente
            res.status(200).json({ token });
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;