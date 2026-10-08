/**
 * Define as regras de validação do formulário de cadastro.
 * Utiliza Yup para validar os campos e gerar seu tipo TypeScript.
 */

import * as yup from "yup";

export const esquemaCadastro = yup.object({
  nome: yup
    .string()
    .required("Informe seu nome")
    .min(3, "Escreva o nome com ao menos 3 letras"),

  email: yup
    .string()
    .required("Informe o e-mail")
    .email("Digite um e-mail válido, como voce@exemplo.com"),

  senha: yup
    .string()
    .required("Crie uma senha")
    .min(6, "A senha precisa de ao menos 6 caracteres"),

  confirmacao: yup
    .string()
    .required("Repita a senha")
    // Compara a confirmação com o valor informado no campo senha.
    .oneOf([yup.ref("senha")], "As senhas não conferem"),
});

// Infere automaticamente o tipo dos dados a partir do esquema.
export type DadosCadastro = yup.InferType<typeof esquemaCadastro>;
