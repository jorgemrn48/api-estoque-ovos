import jwt from 'jsonwebtoken';

const JWT_SECRET = "CHAVE_SECRETA_DISTRIBUIDORA_OVOS"; 

function authMiddleware(req, res, next) {
    //Busca o token no cabeçalho da requisição
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ mensagem: "Token não fornecido." });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json({ mensagem: "Erro no formato do token." });
    }

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ mensagem: "Token mal formatado." });
    }

    //Valida o token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ mensagem: "Token inválido ou expirado." });
        }

        req.vendedorId = decoded.id;
        req.vendedorRole = decoded.role;
        //Chama o próximo middleware ou a rota final
        next();
    });
}

export default authMiddleware;