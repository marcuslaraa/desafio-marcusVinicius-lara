const cardapio = [
  { codigo: "cafe", descricao: "Café", valor: 3, status: "principal" },
  {
    codigo: "chantily",
    descricao: "Chantily (extra do Café)",
    valor: 1.5,
    status: "extraCafe",
  },
  {
    codigo: "suco",
    descricao: "Suco Natural",
    valor: 6.2,
    status: "principal",
  },
  {
    codigo: "sanduiche",
    descricao: "Sanduíche",
    valor: 6.5,
    status: "principal",
  },
  {
    codigo: "queijo",
    descricao: "Queijo (extra do Sanduíche)",
    valor: 2,
    status: "extraSand",
  },
  { codigo: "salgado", descricao: "Salgado", valor: 7.25, status: "principal" },
  {
    codigo: "combo1",
    descricao: "1 Suco e 1 Sanduíche",
    valor: 9.5,
    status: "secundario",
  },
  {
    codigo: "combo1",
    descricao: "1 Café e 1 Sanduíche",
    valor: 7.5,
    status: "secundario",
  },
];

const pagamento = [
  { metodo: "dinheiro", taxa: 0.95 },
  { metodo: "debito", taxa: 1 },
  { metodo: "credito", taxa: 1.03 },
];

class CaixaDaLanchonete {
  verificaCompatibilidade(infoPedido, quantidades, codigos, metodoDePagamento) {
    let validaCodigo = true;

    const infoPedidoCodigos = infoPedido.map((cod) => {
      return cod.codigo;
    });

    console.log(infoPedidoCodigos);

    const infoPedidoStatus = infoPedido.map((stt) => {
      return stt.status;
    });

    for (const codigo of codigos) {
      if (codigo === "") {
        validaCodigo = false;
        console.log("Não há itens no carrinho de compra!");
        break;
      }
    }

    for (const pedido of infoPedido) {
      if (pedido == undefined) {
        validaCodigo = false;
        console.log("Item inválido!");
        break;
      }
    }

    for (const quantidade of quantidades) {
      if (quantidade === 0) {
        validaCodigo = false;
        console.log("Quantidade inválida!");
        break;
      }
    }

    if (
      infoPedidoStatus.includes("extraCafe") &&
      !infoPedidoCodigos.includes("cafe")
    ) {
      validaCodigo = false;
      console.log("Item extra não pode ser pedido sem o principal");
    }

    if (
      infoPedidoStatus.includes("extraSand") &&
      !infoPedidoCodigos.includes("sanduiche")
    ) {
      validaCodigo = false;
      console.log("Item extra não pode ser pedido sem o principal");
    }

    if (
      metodoDePagamento.includes("debito") ||
      metodoDePagamento.includes("credito") ||
      metodoDePagamento.includes("dinheiro")
    ) {
      validaCodigo = true;
    } else {
      validaCodigo = false;
      console.log("Forma de pagamento inválida!");
    }

    return validaCodigo;
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    const codigos = itens.map((item) => {
      return item.split(",")[0];
    });

    const quantidades = itens.map((quantidade) => {
      return Number(quantidade.split(",")[1]);
    });

    const infoPedido = codigos.map((item) => {
      const itemDoCardapio = cardapio.find((c) => c.codigo === item);
      return itemDoCardapio;
    });

    const validacao = this.verificaCompatibilidade(infoPedido, quantidades, codigos, metodoDePagamento);
    console.log(validacao)

    return ""
  }
}

const novoPedido = new CaixaDaLanchonete().calcularValorDaCompra("debito", [
  "chantily,1",
  "cafe,1",
]);
console.log(novoPedido);

export { CaixaDaLanchonete };
