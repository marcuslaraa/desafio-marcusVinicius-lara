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
  // Método criado para fazer verificações em relações as regras definidas no escopo do desafio
  verificaCompatibilidade(infoPedido, quantidades, codigos, metodoDePagamento) {
    let validaCodigo = true;

    const infoPedidoCodigos = infoPedido.map((cod) => {
      return cod.codigo;
    });

    const infoPedidoStatus = infoPedido.map((stt) => {
      return stt.status;
    });

    // validação de pagamento
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

    // Validação de input(pedido)
    for (const codigo of codigos) {
      if (codigo === "") {
        validaCodigo = false;
        console.log("Não há itens no carrinho de compra!");
        break;
      }
    }

    // Validação de input(Iem não existe)
    for (const pedido of infoPedido) {
      if (pedido == undefined) {
        validaCodigo = false;
        console.log("Item inválido!");
        break;
      }
    }

    // Validação da quantidade dos pedidos > 0
    for (const quantidade of quantidades) {
      if (quantidade === 0) {
        validaCodigo = false;
        console.log("Quantidade inválida!");
        break;
      }
    }

    // condição criada com o objetivo de realizar testes de compatabilidade entre os inputs
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

    return validaCodigo;
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    // criando array somente com o codigo ['cafe']
    const codigos = itens.map((item) => {
      return item.split(",")[0];
    });

    // criando array somente com a quantidade e convertendo de string para number [1]
    const quantidades = itens.map((quantidade) => {
      return Number(quantidade.split(",")[1]);
    });

    // buscando objetos(cardapio) através do codigo fornecido no input.
    const infoPedido = codigos.map((item) => {
      const itemDoCardapio = cardapio.find((c) => c.codigo === item);
      return itemDoCardapio;
    });

    // Variavel de validação referente o metodo verificaCompatibilidade()
    const validacao = this.verificaCompatibilidade(
      infoPedido,
      quantidades,
      codigos,
      metodoDePagamento
    );

    // Condição criada para ser executada somente se o imput atender a todas as regras necessarias
    if (validacao) {
      const valores = infoPedido.map((val) => {
        return val.valor;
      });

      const resultado = quantidades.map((qtde, ind) => qtde * valores[ind]);
      let resultadoFinal = resultado.reduce((acum, valInicial) => {
        return acum + valInicial;
      });

      if (metodoDePagamento === "credito") {
        resultadoFinal *= 1.03;
      } else if (metodoDePagamento === "dinheiro") {
        resultadoFinal *= 0.95;
      }

      // Defindo o numero de casas decimais
      resultadoFinal = resultadoFinal.toFixed(2);
      //  convertendo o valor em moeda(real)
      const conversor = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      resultadoFinal = conversor.format(resultadoFinal);

      return resultadoFinal;
    }
  }
}

const novoPedido = new CaixaDaLanchonete().calcularValorDaCompra("credito", ['combo1,1','cafe,2']);
console.log(novoPedido);

export { CaixaDaLanchonete };
