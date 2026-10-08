/**
 * Componente reutilizável para campos de texto em formulários.
 *
 * Integra o TextInput do React Native ao React Hook Form,
 * permitindo controlar valores, validar campos e exibir erros.
 *
 * Conceitos utilizados:
 * - Generics (<T>): permitem utilizar o componente em diferentes formulários.
 * - Interface: define as propriedades aceitas pelo componente.
 * - Controller: conecta o TextInput ao React Hook Form.
 * - Spread (...resto): repassa propriedades adicionais ao TextInput.
 * - Renderização condicional: exibe mensagens e estilos de erro.
 */

import { Text, TextInput, TextInputProps, View } from "react-native";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { useColorScheme } from "nativewind";
import { CORES_NAVEGACAO } from "@/constants/tema";

/**
 * Define as propriedades aceitas pelo componente.
 *
 * T extends FieldValues: restringe T a tipos de dados de formulários.
 * Control<T>: recebe o controle do React Hook Form.
 * Path<T>: garante que o nome seja um caminho válido nos dados do formulário.
 * TextInputProps: permite utilizar propriedades nativas do TextInput.
 */
interface CampoTextoProps<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  rotulo: string;
  erro?: string;
}

export function CampoTexto<T extends FieldValues>({
  control,
  name,
  rotulo,
  erro,
  ...resto
}: CampoTextoProps<T>) {
  // Identifica o tema atual para configurar as cores do campo.
  const { colorScheme } = useColorScheme();

  const cores = CORES_NAVEGACAO[colorScheme === "dark" ? "dark" : "light"];

  return (
    <View className="mb-4">
      <Text className="text-slate-600 dark:text-suave text-xs mb-1.5">
        {rotulo}
      </Text>

      {/*
        Controller conecta o TextInput ao React Hook Form.

        onChange: atualiza o valor do campo.
        onBlur: informa quando o campo perde o foco.
        value: representa o valor atual do campo.
      */}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholderTextColor={cores.inativo}
            accessibilityLabel={rotulo}
            accessibilityHint={erro}
            // Altera a borda conforme a existência de um erro.
            className={`bg-slate-100 dark:bg-superficie text-slate-900 dark:text-white rounded-lg px-4 py-3.5 border ${
              erro ? "border-red-600 dark:border-alerta" : "border-transparent"
            }`}
            // Repassa propriedades adicionais, como placeholder e secureTextEntry.
            {...resto}
          />
        )}
      />

      {/* Exibe a mensagem somente quando existe um erro de validação. */}
      {erro ? (
        <Text className="text-red-700 dark:text-alerta text-xs mt-1.5">
          {erro}
        </Text>
      ) : null}
    </View>
  );
}
