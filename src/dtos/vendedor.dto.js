export class VendedorResponseDTO{
    constructor(vendedor){
        this.id = vendedor.id;
        this.nome = vendedor.nome;
        this.telefone = vendedor.telefone;
        this.login = vendedor.login;
        this.role = vendedor.role;
    }
}