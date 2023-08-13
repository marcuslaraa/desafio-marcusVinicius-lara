const cardapio = [
    {codigo: "cafe", descricao: "Café", valor: 3, status: "principal"},
    {codigo: "chantily", descricao: "Chantily (extra do Café)", valor: 1.5, status: "extra"},
    {codigo: "suco", descricao: "Suco Natural", valor: 6.2, status: "principal"},
    {codigo: "sanduiche", descricao: "Sanduíche", valor: 6.5, status: "principal"},
    {codigo: "queijo", descricao: "Queijo (extra do Sanduíche)", valor: 2, status: "extra"},
    {codigo: "salgado", descricao: "Salgado", valor: 7.25, status: "principal"},
    {codigo: "combo1", descricao: "1 Suco e 1 Sanduíche", valor: 9.5, status: "secundario"},
    {codigo: "combo1", descricao: "1 Café e 1 Sanduíche", valor: 7.5, status: "secundario"}
];


const pagamento = [
    {metodo: "dinheiro", taxa: 0.95},
    {metodo: "debito", taxa: 1},
    {metodo: "credito", taxa: 1.03}
];



class CaixaDaLanchonete {

    verificaCompatibilidade(infoPedido, quantidades, codigos){
        let validaCodigo = true;

        const infoPedidoCodigo = infoPedido.map((code => {
            return infoPedido.codigo;
        }))

        for(const codigo of codigos) {
            if(codigo === '') {
                validaCodigo = false;
                console.log("Não há itens no carrinho de compra!");
                break;
            }
        }

        for(const pedido of infoPedido) {
            if(pedido == undefined) {
                validaCodigo = false;
                console.log("Item inválido!");
                break;
            }
        }

        for(const quantidade of quantidades) {
            if(quantidade === 0) {
                validaCodigo = false;
                console.log("Quantidade inválida!");
                break;
            }
        }

        return validaCodigo;
    }


    calcularValorDaCompra(metodoDePagamento, itens) {
        
        const codigos = itens.map(item => {
           return item.split(',')[0];
        });

        const quantidades = itens.map((quantidade) => {
            return Number(quantidade.split(',')[1]);
        })

        const infoPedido = codigos.map((item) => {
            const itemDoCardapio = cardapio.find((c) => c.codigo === item);
            return itemDoCardapio;
        });
        

        return this.verificaCompatibilidade(infoPedido, quantidades, codigos) ;
    }

}

const novoPedido = new CaixaDaLanchonete().calcularValorDaCompra('debito', ['cafe,1','chantily,1']);
console.log(novoPedido);


export { CaixaDaLanchonete };
