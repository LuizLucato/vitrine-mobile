/**
 * Componente reutilizável responsável pelo filtro de categorias.
 *
 * Exibe uma lista horizontal de categorias e permite selecionar
 * uma delas para filtrar os produtos apresentados no catálogo.
 *
 * Conceitos utilizados:
 * - Props: recebem categorias, seleção atual e função de alteração.
 * - map: percorre o array para gerar os botões dinamicamente.
 * - Renderização condicional: altera o estilo da categoria ativa.
 * - Callback: comunica ao componente pai a categoria selecionada.
 */

import { Pressable, ScrollView, Text } from "react-native";

/**
 * Define as propriedades recebidas pelo componente.
 *
 * categorias: array com os nomes das categorias disponíveis.
 * selecionada: categoria atualmente selecionada.
 * aoSelecionar: função que recebe a categoria escolhida.
 */
interface FiltroCategoriasProps {
  categorias: string[];
  selecionada: string;
  aoSelecionar: (categoria: string) => void;
}

export function FiltroCategorias({
  categorias,
  selecionada,
  aoSelecionar,
}: FiltroCategoriasProps) {
  return (
    // Permite rolar horizontalmente quando existem muitas categorias.
    <ScrollView
      horizontal
      className="grow-0"
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="flex-row items-start gap-2 py-1"
    >
      {/*
        map percorre todas as categorias e cria um botão para cada uma.
        A variável ativa indica se a categoria atual está selecionada.
      */}
      {categorias.map((categoria) => {
        const ativa = categoria === selecionada;

        return (
          <Pressable
            // Identifica cada elemento de maneira única na renderização.
            key={categoria}
            // Informa ao componente pai qual categoria foi selecionada.
            onPress={() => aoSelecionar(categoria)}
            accessibilityRole="button"
            accessibilityLabel={`Filtrar por ${categoria}`}
            // Altera o fundo do botão conforme a categoria ativa.
            className={`px-4 py-2.5 rounded-full active:opacity-60 ${
              ativa
                ? "bg-sky-600 dark:bg-destaque"
                : "bg-slate-200 dark:bg-superficie"
            }`}
          >
            {/* Altera a aparência do texto conforme a seleção. */}
            <Text
              className={
                ativa
                  ? "text-white dark:text-fundo text-[13px] font-bold"
                  : "text-slate-600 dark:text-suave text-[13px]"
              }
            >
              {categoria}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
