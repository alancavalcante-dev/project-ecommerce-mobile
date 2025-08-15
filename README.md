# E-commerce de Produtos (React Native com Expo)

Este é um aplicativo móvel de demonstração que simula um pequeno e-commerce de produtos. O projeto foi desenvolvido com React Native e Expo, focando em funcionalidades essenciais como autenticação de usuário, navegação entre telas e consumo de uma API externa para exibição de produtos.


## ✨ Funcionalidades

-   **Tela de Login**: Formulário de login com validação de dados em tempo real para `username` e `senha`.
-   **Navegação Protegida**: O usuário só pode acessar a área de produtos após um login bem-sucedido.
-   **Listagem de Produtos**:
    -   Exibição dos produtos em uma grade.
    -   Navegação por abas para filtrar entre categorias "Masculinas" e "Femininas".
    -   Consumo de dados da API pública `dummyjson.com`.
-   **Detalhes do Produto**: Tela dedicada que mostra informações detalhadas de um item selecionado, como imagem, preço, desconto e descrição.
-   **Sessão de Usuário**: O nome do usuário logado é exibido no topo das telas, simulando uma sessão ativa.
-   **Logout**: Botão para encerrar a sessão e retornar à tela de login de forma segura.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando tecnologias modernas do ecossistema React Native:

-   **[React Native](https://reactnative.dev/)**: Framework para desenvolvimento de aplicativos móveis multiplataforma.
-   **[Expo](https://expo.dev/)**: Plataforma e conjunto de ferramentas que simplificam o desenvolvimento e a publicação de apps React Native.
-   **[Expo Router](https://expo.github.io/router/)**: Sistema de roteamento baseado em arquivos, que simplifica a navegação e a passagem de parâmetros entre telas.
-   **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática, aumentando a robustez e a manutenibilidade do código.
-   **[Axios](https://axios-http.com/)**: Cliente HTTP baseado em Promises para fazer requisições à API de produtos.

## ⚙️ Pré-requisitos

Antes de começar, garanta que você tenha o seguinte instalado em sua máquina:

-   [Node.js](https://nodejs.org/en/) (versão LTS recomendada)
-   [npm](https://www.npmjs.com/)
-   O aplicativo **Expo Go** instalado em seu celular (iOS ou Android) para testar o projeto.

## 🔧 Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/alancavalcante-dev/project-ecommerce-mobile.git](https://github.com/alancavalcante-dev/project-ecommerce-mobile.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd project-ecommerce-mobile
    ```

3.  **Inicie o servidor de desenvolvimento do Expo:**
    ```bash
    npm install
    ```


4.  **Inicie o servidor de desenvolvimento do Expo:**
    ```bash
    npx expo start
    ```

5.  **Abra o aplicativo:**
    -   Após iniciar o servidor, um QR Code aparecerá no seu terminal.
    -   Abra o aplicativo **Expo Go** no seu celular e escaneie o QR Code.
    -   O aplicativo será carregado e você poderá começar a usá-lo.

## 📂 Estrutura do Projeto

A estrutura de pastas principal do projeto é organizada da seguinte forma, utilizando as convenções do Expo Router:


-   **`src/app/`**: Diretório raiz para todas as rotas do aplicativo.
-   **`src/app/index.tsx`**: É a primeira tela que o usuário vê (Login).
-   **`src/app/produtos`**: Contém todas as telas relacionadas à funcionalidade de produtos.
-   **`src/app/components`**: Componentes para facilitar e ter flexibilidade para reutilizar códigos.
-   **`src/services`**: Serviços externos, como consulta de API.

---

