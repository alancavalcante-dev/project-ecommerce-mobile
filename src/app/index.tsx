import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados para armazenar as mensagens de erro de cada campo
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const router = useRouter();

  const validateFields = () => {
    let isValid = true;
    
    setUsernameError('');
    setPasswordError('');

    const usernameIssues = [];
    if (username.length < 2) {
      usernameIssues.push('• Mínimo de 2 caracteres.');
    }
    if (!/[a-zA-Z]/.test(username)) {
      usernameIssues.push('• Deve conter pelo menos uma letra.');
    }
    if (!/\d/.test(username)) {
      usernameIssues.push('• Deve conter pelo menos um número.');
    }

    if (usernameIssues.length > 0) {
      setUsernameError(usernameIssues.join('\n'));
      isValid = false;
    }

    const passwordIssues = [];
    if (password.length < 3) {
      passwordIssues.push('• Mínimo de 3 caracteres.');
    }
    if (!/[a-zA-Z]/.test(password)) {
      passwordIssues.push('• Deve conter pelo menos uma letra.');
    }
    if (!/\d/.test(password)) {
      passwordIssues.push('• Deve conter pelo menos um número.');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      passwordIssues.push('• Deve conter um caractere especial (ex: !@#$).');
    }
    
    if (passwordIssues.length > 0) {
      setPasswordError(passwordIssues.join('\n'));
      isValid = false;
    }
    
    return isValid;
  };

  const handleLogin = () => {
    if (validateFields()) {
      console.log('Login feito sucesso!');
      router.push({ pathname: '/produtos', params: { user: username } });
    } else {
      console.log('Falha na validação do formulário.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Bem-vindo de volta!</Text>
          <Text style={styles.subtitle}>Insira seus dados para entrar na sua conta.</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={[styles.input, usernameError ? styles.inputError : null]}
            placeholder="Digite seu username"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              if (usernameError) setUsernameError('');
            }}
            autoCapitalize="none"
          />
          {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
          
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={[styles.input, passwordError ? styles.inputError : null]}
            placeholder="Digite sua senha"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError('');
            }}
            secureTextEntry
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f0f4f7',
  },
  header: {
    backgroundColor: '#007bff',
    height: 300, 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#fff' 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#fff', 
    marginTop: 8, 
    textAlign: 'center' 
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 25,
    marginHorizontal: 20,
    marginTop: -80, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  label: { 
    fontSize: 16, 
    marginBottom: 8, 
    color: '#333' 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 5,
  },
  inputError: {
    borderColor: '#d9534f',
    borderWidth: 1.5,
  },
  errorText: {
    color: '#d9534f',
    fontSize: 12,
    marginBottom: 10,
    lineHeight: 18,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
