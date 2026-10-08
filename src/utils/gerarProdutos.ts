import { PRODUTOS } from "@/constants/produtos";
import { Produto } from "@/types/produto";

/** Repete a base de exemplo até atingir a quantidade pedida. */
export function gerarProdutos(quantidade: number): Produto[] {
  const lista: Produto[] = [];

  for (let i = 0; i < quantidade; i += 1) {
    const base = PRODUTOS[i % PRODUTOS.length]; // Resto da divisão

    lista.push({
      ...base, //Espalhamento. Copia todos os campos da base e depois sobrescreve o id.
      id: i + 1,
      title: `${base.title} #${i + 1}`, // Template String. Coloca o numero no titulo, para distinguir os itens na tela.
    });
  }

  return lista;
}

// Gerada uma única vez, quando o arquivo é carregado.
// O catálogo e o detalhe importam esta mesma constante e enxergam os mesmos produtos.

// Constante de módulo. O que está fora de funções roda uma única vez, quando o arquivo é importado pela primeira vez.
// Todos que importam recebem o mesmo arranjo
export const PRODUTOS_TESTE = gerarProdutos(500);
