import { Stack } from 'expo-router';
import React from 'react';

// Este layout simplesmente define que as telas dentro da pasta 'produtos'
// farão parte de uma pilha de navegação (Stack).
// As configurações de cabeçalho agora são feitas em cada tela individualmente
// para permitir a exibição de conteúdo dinâmico, como o nome do usuário.
export default function ProductsLayout() {
  return <Stack />;
}
