# Mini Twitter - Desafio Técnico B2Bit

Este é um projeto de rede social simplificada desenvolvido como parte de um desafio técnico. A aplicação permite o cadastro de usuários, autenticação via JWT e gerenciamento de postagens (CRUD) com interações de curtidas.

## Tecnologias Utilizadas

-   **Frontend**: React.js com TypeScript e Vite.
    
-   **Estilização**: Tailwind CSS.
    
-   **Comunicação**: Axios (com interceptors para autenticação).
    
-   **Ícones**: Lucide-React.
    
-   **Backend**: API em Bun (executada via Docker).
    

## Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

-   Node.js ou Bun.
    
-   Docker e Docker Compose.
    

## Como Executar o Projeto

### 1. Configurar o Backend (API)

O backend é fornecido via imagem Docker. Certifique-se de que o Docker está rodando e execute:

Bash

```
docker-compose up -d

```

A API estará disponível em `http://localhost:3000`. Você pode conferir a documentação dos endpoints em `http://localhost:3000/swagger`.

### 2. Configurar o Frontend

Navegue até a pasta raiz do frontend e siga os passos abaixo:

Bash

```
# Instalar as dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev

```

A aplicação estará disponível em `http://localhost:5173`.

## Funcionalidades Implementadas

### Autenticação

-   Cadastro de novos usuários.
    
-   Login com persistência de sessão via LocalStorage (JWT).
    
-   Logout com limpeza de credenciais.
    

### Feed e Posts

-   Listagem de publicações em tempo real.
    
-   Criação de novos posts (com geração automática de títulos).
    
-   Edição de conteúdo de posts próprios.
    
-   Exclusão de publicações (apenas para o autor).
    
-   Validação de tamanho de imagem (limite de 5MB).
    

### Interação Social

-   Sistema de curtidas (Likes) persistente no banco de dados.
    
-   Identificação visual de posts de autoria do próprio usuário logado.
    

## Padronização e Qualidade

-   **Acessibilidade**: Implementação de labels e atributos ARIA para leitores de tela.
    
-   **TypeScript**: Tipagem estrita em todos os componentes para evitar erros em tempo de execução.
    
-   **Responsividade**: Layout adaptável para diferentes tamanhos de tela utilizando Tailwind CSS.
    

----------

Este projeto foi desenvolvido com foco em organização de código e fidelidade aos requisitos funcionais apresentados.

**Deseja que eu acrescente alguma seção específica sobre como você organizou as pastas do projeto (Arquitetura)?** Isso ajuda muito a explicar o seu raciocínio para o avaliador.