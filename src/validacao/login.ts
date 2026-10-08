/**
 * Define as regras de validação do formulário de login.
 * Utiliza Yup para verificar usuário e senha antes do envio.
 */

import * as yup from "yup";

export const esquemaLogin = yup.object({
  usuario: yup
    .string()
    .required("Informe o usuário")
    // Expressão regular que impede espaços em qualquer posição.
    .matches(/^\S+$/, "O usuário não tem espaços")
    .min(3, "O usuário tem ao menos 3 caracteres"),

  senha: yup
    .string()
    .required("Informe a senha")
    .min(6, "A senha tem ao menos 6 caracteres"),
});

// o tipo nasce do esquema: uma fonte de verdade só
export type DadosLogin = yup.InferType<typeof esquemaLogin>;
