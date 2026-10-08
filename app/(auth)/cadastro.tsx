/**
 * Tela responsável pelo formulário de cadastro de usuários.
 *
 * Utiliza React Hook Form para gerenciar os campos e o Yup para validar
 * os dados informados. O cadastro é simulado, sem comunicação com uma API.
 *
 * Funcionalidades:
 * - Validar nome, e-mail, senha e confirmação de senha.
 * - Exibir mensagens de erro nos campos.
 * - Simular o envio dos dados de cadastro.
 * - Impedir múltiplos envios enquanto o formulário é processado.
 * - Redirecionar o usuário para o login após o cadastro simulado.
 */

import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CampoTexto } from "@/components/CampoTexto";
import { DadosCadastro, esquemaCadastro } from "@/validacao/cadastro";

export default function CadastroScreen() {
  // Permite navegar entre as telas utilizando o Expo Router.
  const router = useRouter();

  /**
   * Configura o formulário utilizando React Hook Form.
   *
   * control: controla os campos conectados ao formulário.
   * handleSubmit: valida os dados antes de executar o envio.
   * setError: permite definir erros manualmente em campos específicos.
   * reset: restaura os valores iniciais do formulário.
   * errors: armazena os erros de validação.
   * isSubmitting: indica se o formulário está sendo enviado.
   */
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DadosCadastro>({
    // Define os valores iniciais dos campos.
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      confirmacao: "",
    },

    // Integra o esquema de validação do Yup ao React Hook Form.
    resolver: yupResolver(esquemaCadastro),

    // Valida inicialmente ao sair do campo e revalida ao alterar seu valor.
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  /**
   * Executada após o formulário passar pelas validações do Yup.
   * Simula o cadastro e trata um possível erro no e-mail informado.
   */
  async function aoEnviar(dados: DadosCadastro) {
    // Simula uma requisição assíncrona com duração de 1,2 segundo.
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Simula um erro caso o e-mail já esteja cadastrado.
    if (dados.email === "emily.johnson@x.dummyjson.com") {
      // Associa a mensagem de erro diretamente ao campo de e-mail.
      setError("email", {
        message: "Este e-mail já tem cadastro.",
      });

      return;
    }

    console.log("cadastrado:", dados.nome, dados.email);

    // Limpa os campos e substitui a tela atual pela tela de login.
    reset();
    router.replace("/login");
  }

  return (
    // Ajusta o comportamento da tela quando o teclado aparece no iOS.
    <KeyboardAvoidingView
      className="flex-1 bg-white dark:bg-fundo"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerClassName="flex-grow justify-center p-6"
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-sky-700 dark:text-destaque text-3xl font-bold mb-1">
          Criar conta
        </Text>

        <Text className="text-slate-500 dark:text-suave text-sm mb-8">
          Leva menos de um minuto.
        </Text>

        {/* Componente reutilizável conectado ao React Hook Form. */}
        <CampoTexto
          control={control}
          name="nome"
          rotulo="Nome"
          erro={errors.nome?.message}
          placeholder="como devemos chamar você"
          autoComplete="name"
        />

        <CampoTexto
          control={control}
          name="email"
          rotulo="E-mail"
          erro={errors.email?.message}
          placeholder="voce@exemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <CampoTexto
          control={control}
          name="senha"
          rotulo="Senha"
          erro={errors.senha?.message}
          placeholder="mínimo de 6 caracteres"
          secureTextEntry
        />

        <CampoTexto
          control={control}
          name="confirmacao"
          rotulo="Confirme a senha"
          erro={errors.confirmacao?.message}
          placeholder="a mesma senha de cima"
          secureTextEntry
        />

        {/* Envia o formulário somente após a validação dos campos. */}
        <Pressable
          onPress={handleSubmit(aoEnviar)}
          disabled={isSubmitting}
          accessibilityRole="button"
          accessibilityState={{ disabled: isSubmitting }}
          className={`rounded-full py-4 items-center mt-2 ${
            isSubmitting
              ? "bg-slate-200 dark:bg-superficie"
              : "bg-sky-600 dark:bg-destaque active:opacity-80"
          }`}
        >
          {/* Altera o texto e o estilo enquanto o cadastro é processado. */}
          <Text
            className={`font-bold ${
              isSubmitting
                ? "text-slate-500 dark:text-suave"
                : "text-white dark:text-fundo"
            }`}
          >
            {isSubmitting ? "Criando conta..." : "Criar conta"}
          </Text>
        </Pressable>

        {/* Navega para o login substituindo a tela atual no histórico. */}
        <Link
          href="/login"
          replace
          className="text-sky-700 dark:text-destaque text-center mt-6"
        >
          Já tenho conta
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
