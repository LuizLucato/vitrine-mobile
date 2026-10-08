/**
 * Tela principal responsável pelo catálogo de produtos.
 *
 * Exibe uma lista de produtos fictícios, permitindo filtrar por
 * categoria, marcar favoritos e acessar os detalhes de cada produto.
 *
 * Funcionalidades:
 * - Exibir produtos utilizando FlatList.
 * - Filtrar os produtos pela categoria selecionada.
 * - Adicionar e remover produtos dos favoritos.
 * - Navegar para a tela de detalhes de cada produto.
 * - Simular a atualização da lista com pull-to-refresh.
 * - Exibir estados de carregamento e lista vazia.
 *
 * Conceitos utilizados:
 * - useState: gerencia os estados da tela.
 * - useMemo: memoriza o resultado da filtragem.
 * - useCallback: mantém referências estáveis das funções.
 * - FlatList: renderiza listas de maneira otimizada.
 * - async/await: permite trabalhar com operações assíncronas.
 */

import { useCallback, useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { useRouter } from "expo-router";
import { CardProduto } from "@/components/CardProduto";
import { FiltroCategorias } from "@/components/FiltroCategorias";
import { Carregando, Vazio } from "@/components/EstadosDeLista";
import { PRODUTOS_TESTE } from "@/utils/gerarProdutos";
import { Produto } from "@/types/produto";

// Categorias disponíveis para filtragem dos produtos.
const CATEGORIAS = ["todas", "beauty", "fragrances", "furniture"];

// Fora do componente: é criado uma vez só, e não a cada renderização.
function Separador() {
  return <View className="h-3" />;
}

export default function CatalogoScreen() {
  // Permite navegar para outras telas do aplicativo.
  const router = useRouter();

  /**
   * Estados utilizados na tela:
   *
   * categoria: armazena a categoria selecionada pelo usuário.
   * favoritos: armazena os IDs dos produtos marcados como favoritos.
   * carregando: controla a exibição do indicador de carregamento inicial.
   * atualizando: controla o indicador de atualização da FlatList.
   */
  const [categoria, setCategoria] = useState("todas");
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [carregando] = useState(false); // no encontro 8 vira estado de verdade
  const [atualizando, setAtualizando] = useState(false); // NOVO

  /**
   * useMemo memoriza o resultado da filtragem dos produtos.
   *
   * Se a categoria for "todas", retorna a lista completa.
   * Caso contrário, utiliza filter para selecionar apenas os
   * produtos que pertencem à categoria escolhida.
   *
   * O cálculo só é refeito quando a categoria muda,
   * evitando filtragens desnecessárias em outras renderizações.
   */
  const visiveis = useMemo(
    () =>
      categoria === "todas"
        ? PRODUTOS_TESTE
        : PRODUTOS_TESTE.filter((p) => p.category === categoria),
    [categoria],
  );

  /**
   * useCallback memoriza a função de alternar favoritos.
   *
   * includes: verifica se o ID já está entre os favoritos.
   * filter: remove o produto caso ele já esteja favoritado.
   * spread (...): cria um novo array adicionando o ID.
   *
   * A atualização utiliza o estado anterior (atuais) para
   * garantir que a alteração seja feita sobre o valor mais recente.
   *
   * O array vazio [] indica que a função não depende de
   * valores externos que precisem atualizar sua referência.
   */
  const alternarFavorito = useCallback((id: number) => {
    setFavoritos((atuais) =>
      atuais.includes(id) ? atuais.filter((f) => f !== id) : [...atuais, id],
    );
  }, []);

  /**
   * Memoriza a função responsável por abrir os detalhes do produto.
   *
   * router.push adiciona uma nova tela ao histórico de navegação.
   * O ID é enviado como parâmetro dinâmico da rota.
   *
   * [router] indica que a função será recriada caso
   * a referência do router seja alterada.
   */
  const abrir = useCallback(
    (id: number) => router.push(`/produto/${id}`),
    [router],
  );

  /**
   * Simula a atualização dos produtos ao puxar a lista para baixo.
   *
   * setAtualizando(true): ativa o indicador de atualização.
   * await: aguarda 1,2 segundo simulando uma requisição.
   * finally: garante que o indicador seja desativado,
   * mesmo que ocorra algum erro durante a operação.
   */
  const atualizar = useCallback(async () => {
    setAtualizando(true);

    try {
      // no encontro 8 isto vira uma chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1200));
    } finally {
      // roda com sucesso OU com erro: o indicador sempre para
      setAtualizando(false);
    }
  }, []);

  /**
   * useCallback memoriza a função de renderização dos produtos.
   *
   * Cada item da FlatList é enviado ao componente CardProduto,
   * junto com seu estado de favorito e as funções de interação.
   *
   * A função será recriada quando alguma das dependências
   * [favoritos, alternarFavorito, abrir] for alterada.
   */
  const renderizarItem = useCallback(
    ({ item }: { item: Produto }) => (
      <CardProduto
        produto={item}
        favorito={favoritos.includes(item.id)}
        aoAlternarFavorito={alternarFavorito}
        aoAbrir={abrir}
      />
    ),
    [favoritos, alternarFavorito, abrir],
  );

  /**
   * Renderização condicional do estado de carregamento.
   *
   * O retorno antecipado acontece depois de todos os hooks,
   * respeitando a regra de execução consistente dos hooks do React.
   */
  if (carregando) {
    return <Carregando texto="Buscando produtos..." />;
  }

  return (
    <FlatList
      className="flex-1 bg-white dark:bg-fundo"
      contentContainerClassName="p-4"
      // Lista de produtos que será exibida após a filtragem.
      data={visiveis}
      // Define uma chave única para identificar cada produto.
      keyExtractor={(item) => String(item.id)}
      // Função responsável por renderizar cada item da lista.
      renderItem={renderizarItem}
      // Componente exibido antes dos produtos, contendo os filtros.
      ListHeaderComponent={
        <View className="mb-4">
          <FiltroCategorias
            categorias={CATEGORIAS}
            selecionada={categoria}
            aoSelecionar={setCategoria}
          />
        </View>
      }
      // Exibe uma mensagem quando a filtragem não encontra produtos.
      ListEmptyComponent={<Vazio texto="Nenhum produto nesta categoria." />}
      // Adiciona um espaçamento entre os produtos.
      ItemSeparatorComponent={Separador}
      // Controla o indicador e a função de atualização da lista.
      refreshing={atualizando}
      onRefresh={atualizar}
      // Configurações de exibição e otimização da FlatList.
      showsVerticalScrollIndicator={false}
      initialNumToRender={8}
      windowSize={10}
    />
  );
}
