export function checkRole(...allowedRoles){
    return (req, res, next) => {
        const vendedorRole = req.vendedorRole;
        const hasPermission = allowedRoles.includes(vendedorRole);
        if(!hasPermission){
            return res.status(403).json({mensagem: "Acesso negado. Permissão insuficiente"});
        }
        next();
    };
}