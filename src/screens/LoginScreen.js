
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
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Digite seu e-mail')
    .email('Digite um e-mail válido'),

  password: z
    .string()
    .min(1, 'Digite sua senha')
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export default function LoginScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

 async function handleLogin(data) {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      alert('Falha ao entrar: ' + error.message);
      return;
    }

    navigation.navigate('Home');
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
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>R</Text>
        </View>

        <Text style={styles.title}>Rota da Saúde</Text>

        <Text style={styles.subtitle}>
          Cuidando de você em cada etapa.
        </Text>

        <View style={styles.form}>
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
                placeholder="Digite sua senha"
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

          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => {}}
          >
            <Text style={styles.forgotText}>
              Esqueci minha senha
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleSubmit(handleLogin)}
          >
            <Text style={styles.loginButtonText}>
              Entrar
            </Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>
              Ainda não possui uma conta?
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.registerLink}>
                {' '}Criar conta
              </Text>
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
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 40,
  },

  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2E8B72',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  logo: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#183B35',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    color: '#6B7C77',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 35,
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

  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: 12,
  },

  forgotText: {
    color: '#2E8B72',
    fontSize: 14,
    fontWeight: '600',
  },

  loginButton: {
    height: 52,
    backgroundColor: '#2E8B72',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },

  registerText: {
    color: '#6B7C77',
    fontSize: 14,
  },

  registerLink: {
    color: '#2E8B72',
    fontSize: 14,
    fontWeight: 'bold',
  },
});