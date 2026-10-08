/**
 * Tela responsável por tratar rotas não encontradas no aplicativo.
 *
 * O Expo Router utiliza o arquivo +not-found.tsx para exibir
 * uma tela alternativa quando uma rota não corresponde
 * a nenhuma página existente.
 *
 * Funcionalidades:
 * - Informar ao usuário que a tela solicitada não existe.
 * - Personalizar o título do cabeçalho.
 * - Disponibilizar um link para retornar ao catálogo.
 * - Aplicar estilos compatíveis com os temas claro e escuro.
 *
 * Conceitos utilizados:
 * - Stack.Screen: configura opções da tela atual.
 * - Link: permite navegar entre rotas do Expo Router.
 * - NativeWind: aplica estilos utilizando classes.
 */

import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NaoEncontrado() {
  return (
    // Container principal centralizado, com suporte aos dois temas.
    <View className="flex-1 bg-white dark:bg-fundo items-center justify-center p-6">
      {/* Define o título exibido no cabeçalho desta tela. */}
      <Stack.Screen options={{ title: "Ops" }} />

      {/* Mensagem exibida quando a rota solicitada não existe. */}
      <Text className="text-slate-900 dark:text-white text-lg text-center">
        Esta tela não existe.
      </Text>

      {/* Permite retornar à rota principal do catálogo. */}
      <Link href="/" className="text-sky-700 dark:text-destaque mt-4">
        Voltar ao catálogo
      </Link>
    </View>
  );
}
