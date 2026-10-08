/**
 * Tela responsável pela autenticação simulada de usuários.
 *
 * Utiliza React Hook Form para controlar os campos e Yup para validar
 * os dados antes do envio. A autenticação é simulada com credenciais fixas.
 *
 * Funcionalidades:
 * - Validar usuário e senha.
 * - Exibir erros de validação e autenticação.
 * - Simular uma requisição assíncrona de login.
 * - Desabilitar o botão durante o envio.
 * - Redirecionar para o catálogo após o login bem-sucedido.
 * - Permitir navegar para a tela de cadastro.
 */

import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CampoTexto } from "@/components/CampoTexto";
import { DadosLogin, esquemaLogin } from "@/validacao/login";

export default function LoginScreen() {
  // Permite realizar navegações programaticamente.
  const router = useRouter();

  /**
   * Inicializa o formulário de login.
   *
   * O tipo DadosLogin garante a tipagem dos campos.
   * O yupResolver utiliza as regras definidas no esquemaLogin.
   *
   * errors: contém os erros encontrados.
   * isSubmitting: indica se o formulário está sendo processado.
   */
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<DadosLogin>({
    defaultValues: {
      usuario: "",
      senha: "",
    },

    resolver: yupResolver(esquemaLogin),

    // Valida ao sair do campo e revalida durante as alterações.
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  /**
   * Executa a autenticação simulada após validar os campos.
   * Compara os dados informados com credenciais predefinidas.
   */
  async function aoEnviar(dados: DadosLogin) {
    // Simula o tempo de resposta de uma API de autenticação.
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Verifica se o usuário ou a senha são diferentes dos esperados.
    if (dados.usuario !== "emilys" || dados.senha !== "emilyspass") {
      // Define um erro geral sem informar qual credencial está incorreta.
      setError("root", {
        message: "Usuário ou senha incorretos.",
      });

      return;
    }

    console.log("autenticado:", dados.usuario);

    // Substitui a tela de login pela tela principal do catálogo.
    router.replace("/");
  }

  return (
    // Evita que o teclado sobreponha o formulário no iOS.
    <KeyboardAvoidingView
      className="flex-1 bg-white dark:bg-fundo"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerClassName="flex-grow justify-center p-6"
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-sky-700 dark:text-destaque text-3xl font-bold mb-1">
          Vitrine
        </Text>

        <Text className="text-slate-500 dark:text-suave text-sm mb-8">
          Entre para ver seus favoritos.
        </Text>

        {/* Exibe uma mensagem geral quando a autenticação falha. */}
        {errors.root ? (
          <View className="bg-red-50 dark:bg-alerta/20 border border-red-600 dark:border-alerta rounded-lg p-3 mb-4">
            <Text className="text-red-700 dark:text-alerta text-sm">
              {errors.root.message}
            </Text>
          </View>
        ) : null}

        {/* Campos reutilizáveis controlados pelo React Hook Form. */}
        <CampoTexto
          control={control}
          name="usuario"
          rotulo="Usuário"
          erro={errors.usuario?.message}
          placeholder="ex.: emilys"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="username"
        />

        <CampoTexto
          control={control}
          name="senha"
          rotulo="Senha"
          erro={errors.senha?.message}
          placeholder="mínimo de 6 caracteres"
          secureTextEntry
          autoComplete="password"
        />

        {/* handleSubmit valida os dados antes de chamar aoEnviar. */}
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
          {/* Exibe o estado de carregamento durante a autenticação. */}
          <Text
            className={`font-bold ${
              isSubmitting
                ? "text-slate-500 dark:text-suave"
                : "text-white dark:text-fundo"
            }`}
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Text>
        </Pressable>

        {/* Permite acessar o cadastro sem empilhar outra tela no histórico. */}
        <Link
          href="/cadastro"
          replace
          className="text-sky-700 dark:text-destaque text-center mt-6"
        >
          Ainda não tenho conta
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
