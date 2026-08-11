import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';

import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '../supabaseClient';
const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Digite seu nome completo')
      .min(3, 'Digite seu nome completo'),

    email: z
      .string()
      .min(1, 'Digite seu e-mail')
      .email('Digite um e-mail válido'),

    password: z
      .string()
      .min(1, 'Digite uma senha')
      .min(6, 'A senha deve ter pelo menos 6 caracteres'),

    confirmPassword: z
      .string()
      .min(1, 'Confirme sua senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não são iguais',
    path: ['confirmPassword'],
  });

export default function RegisterScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function handleRegister(data) {
    // 1. Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (authError) {
      alert('Erro no cadastro: ' + authError.message);
      return;
    }

    // 2. Salvar nome na tabela 'profiles'
    if (authData?.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            full_name: data.name,
            role: 'patient',
          },
        ]);

      if (profileError) {
        console.error('Erro ao salvar perfil:', profileError.message);
      }
    }

    alert('Conta criada com sucesso!');
    navigation.navigate('Login');
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>‹ Voltar</Text>
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Text style={styles.logo}>R</Text>
        </View>

        <Text style={styles.title}>Criar conta</Text>

        <Text style={styles.subtitle}>
          Faça seu cadastro no Rota da Saúde.
        </Text>

        <View style={styles.form}>

          
          <Text style={styles.label}>Nome completo</Text>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  errors.name && styles.inputError,
                ]}
                placeholder="Digite seu nome"
                placeholderTextColor="#999"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="words"
              />
            )}
          />

          {errors.name && (
            <Text style={styles.errorText}>
              {errors.name.message}
            </Text>
          )}

          
          <Text style={styles.label}>E-mail</Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  errors.email && styles.inputError,
                ]}
                placeholder="Digite seu e-mail"
                placeholderTextColor="#999"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />

          {errors.email && (
            <Text style={styles.errorText}>
              {errors.email.message}
            </Text>
          )}

          
          <Text style={styles.label}>Senha</Text>

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  errors.password && styles.inputError,
                ]}
                placeholder="Crie uma senha"
                placeholderTextColor="#999"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
              />
            )}
          />

          {errors.password && (
            <Text style={styles.errorText}>
              {errors.password.message}
            </Text>
          )}

          
          <Text style={styles.label}>Confirmar senha</Text>

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  errors.confirmPassword && styles.inputError,
                ]}
                placeholder="Digite a senha novamente"
                placeholderTextColor="#999"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
              />
            )}
          />

          {errors.confirmPassword && (
            <Text style={styles.errorText}>
              {errors.confirmPassword.message}
            </Text>
          )}

          
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleSubmit(handleRegister)}
          >
            <Text style={styles.registerButtonText}>
              Criar minha conta
            </Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Já possui uma conta?
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginLink}> Entrar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FAF8',
  },

  scroll: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingVertical: 30,
  },

  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 25,
  },

  backText: {
    color: '#2E8B72',
    fontSize: 16,
    fontWeight: '600',
  },

  logoContainer: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: '#2E8B72',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  logo: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#183B35',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    color: '#6B7C77',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 25,
  },

  form: {
    width: '100%',
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#29443E',
    marginBottom: 8,
    marginTop: 12,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#D5E2DE',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#183B35',
  },

  inputError: {
    borderColor: '#D9534F',
  },

  errorText: {
    color: '#D9534F',
    fontSize: 12,
    marginTop: 5,
  },

  registerButton: {
    height: 52,
    backgroundColor: '#2E8B72',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
  },

  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },

  loginText: {
    color: '#6B7C77',
    fontSize: 14,
  },

  loginLink: {
    color: '#2E8B72',
    fontSize: 14,
    fontWeight: 'bold',
  },
});