/**
 * Arquivo responsável por centralizar as configurações visuais
 * e o endereço base da API utilizada pelo aplicativo.
 *
 * Funcionalidades:
 * - Definir as cores principais do tema escuro.
 * - Configurar as cores de navegação para os temas claro e escuro.
 * - Evitar a repetição de valores de cores em diferentes arquivos.
 * - Disponibilizar o endereço base da API DummyJSON.
 *
 * Conceitos utilizados:
 * - Objetos: agrupam configurações em propriedades.
 * - as const: preserva os valores literais e torna as propriedades readonly.
 * - Reutilização: permite utilizar as mesmas cores em diferentes telas.
 */

// Define as cores principais utilizadas no tema escuro.
export const CORES = {
  fundo: "#0F1B33",
  superficie: "#1D3B73",
  destaque: "#61DAFB",
  texto: "#FFFFFF",
  textoSuave: "#CBD5E1",
} as const;

// As opções do Stack e das Tabs recebem objeto de estilo, e não className:
// o cabeçalho e a barra de abas precisam das cores como valor, nos dois temas.

/**
 * Define as cores utilizadas pelos componentes de navegação.
 *
 * light: configura as cores do tema claro.
 * dark: configura as cores do tema escuro.
 *
 * No tema escuro, algumas propriedades reutilizam os valores
 * definidos em CORES, evitando duplicação de configurações.
 *
 * O tema é selecionado dinamicamente utilizando useColorScheme.
 */
export const CORES_NAVEGACAO = {
  light: {
    fundo: "#FFFFFF",
    borda: "#E2E8F0",
    texto: "#0F172A",
    destaque: "#0369A1",
    inativo: "#64748B",
  },
  dark: {
    fundo: CORES.fundo,
    borda: CORES.superficie,
    texto: CORES.texto,
    destaque: CORES.destaque,
    inativo: CORES.textoSuave,
  },
} as const;

// Endereço base da API DummyJSON, utilizado como referência para requisições.
export const API_BASE_URL = "https://dummyjson.com";
