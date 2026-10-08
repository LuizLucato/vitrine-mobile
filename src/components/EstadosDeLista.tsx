/**
 * Componentes reutilizáveis para representar estados de uma lista.
 *
 * Carregando: exibe um indicador durante o carregamento dos dados.
 * Vazio: apresenta uma mensagem quando não existem itens.
 * Erro: exibe uma mensagem e permite tentar novamente.
 *
 * Conceitos utilizados:
 * - Props: permitem personalizar mensagens e comportamentos.
 * - Valores padrão: definem valores quando uma prop não é informada.
 * - Interface: define os tipos das propriedades.
 * - Callback: permite executar uma função de tentativa novamente.
 */

import { ActivityIndicator, Pressable, Text, View } from "react-native";

/**
 * Exibe um indicador de carregamento com uma mensagem.
 *
 * texto?: string indica uma propriedade opcional.
 * Caso não seja informada, utiliza "Carregando..." como padrão.
 */
export function Carregando({ texto = "Carregando..." }: { texto?: string }) {
  return (
    <View className="items-center justify-center py-16">
      <ActivityIndicator size="large" color="#0EA5E9" />

      <Text className="text-slate-500 dark:text-suave mt-3">{texto}</Text>
    </View>
  );
}

/**
 * Exibe uma mensagem quando não existem itens disponíveis.
 *
 * A propriedade texto é obrigatória e permite reutilizar
 * o componente com diferentes mensagens.
 */
export function Vazio({ texto }: { texto: string }) {
  return (
    <View className="items-center justify-center py-16 px-6">
      <Text className="text-slate-900 dark:text-white text-base text-center">
        {texto}
      </Text>
    </View>
  );
}

/**
 * Define as propriedades do componente de erro.
 *
 * mensagem: texto que será exibido ao usuário.
 * aoTentarNovamente: função executada ao pressionar o botão.
 *
 * () => void representa uma função sem parâmetros
 * e cujo retorno não é utilizado.
 */
interface ErroProps {
  mensagem: string;
  aoTentarNovamente: () => void;
}

/**
 * Exibe uma mensagem de erro e um botão para tentar novamente.
 * A ação do botão é definida pelo componente que utiliza Erro.
 */
export function Erro({ mensagem, aoTentarNovamente }: ErroProps) {
  return (
    <View className="items-center justify-center py-16 px-6">
      <Text className="text-slate-900 dark:text-white text-base text-center mb-4">
        {mensagem}
      </Text>

      <Pressable
        // Executa a função recebida quando o usuário pressiona o botão.
        onPress={aoTentarNovamente}
        accessibilityRole="button"
        className="bg-sky-600 dark:bg-destaque px-5 py-3 rounded-full active:opacity-70"
      >
        <Text className="text-white dark:text-fundo font-bold">
          Tentar novamente
        </Text>
      </Pressable>
    </View>
  );
}
