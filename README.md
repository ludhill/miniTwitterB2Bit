
# Mini Twitter B2Bit

Este projeto consiste em uma aplicação de rede social simplificada, desenvolvida como parte de um desafio técnico. A proposta vai além do CRUD básico, focando na implementação de padrões modernos de desenvolvimento Front-end, como gerenciamento de estado de servidor, validação rigorosa de dados e uma interface responsiva que prioriza a acessibilidade.

----------

## Arquitetura e Decisões Técnicas
| **Tecnologia** | **Função** | **Justificativa Técnica** |
|--|--|--|
| **Vite 8 + TS** | Build & Tipagem | Utilização da versão mais recente do ecossistema para máxima performance em tempo de desenvolvimento e segurança de tipos em escala. |
| **TanStack Query** | Server State | Substitui o uso excessivo de `useEffect` e estados globais para dados de API, permitindo cache inteligente, sincronização automática e estados de _loading_ nativos. |
| **Zod + Hook Form** | Formulários | Implementação de validação declarativa e "uncontrolled components", reduzindo re-renderizações desnecessárias e garantindo integridade de dados antes do disparo de requisições. |
| **Tailwind CSS** | Estilização | Abordagem "utility-first" que garante um CSS enxuto e rapidez na prototipagem de interfaces complexas e responsivas. |
| **Axios** | HTTP Client | Centralização da comunicação via instâncias e interceptors, facilitando a injeção automática de tokens JWT. |
| | | |
----------


##  Funcionalidades de Destaque

###  1. Busca Dinâmica com Debounce

A busca por posts foi implementada integrando o parâmetro `search` diretamente na API. Para otimizar a performance, utilizou-se uma lógica de **Debounce** de 500ms, evitando disparos excessivos de requisições a cada tecla digitada e garantindo uma experiência fluida.

> **Nota Técnica:** Durante o desenvolvimento, identificou-se que o backend realiza o filtro estritamente pelo campo `title`. A aplicação reflete esse comportamento, garantindo fidelidade ao contrato da API.

###  2. Modo Visitante (Timeline Pública)

Diferente de aplicações fechadas, este projeto adota uma política de "Timeline Pública". Usuários não autenticados podem visualizar todos os posts, mas as interações de escrita (postar, curtir, editar, excluir) são protegidas por travas de UI e lógica de interceptação de token, incentivando o engajamento sem restringir o acesso inicial.

###  3. Gestão de Mídia (FormData)

O envio de publicações suporta o anexo de imagens. A integração foi feita utilizando o objeto `FormData`, padrão da web para envio de arquivos binários, acompanhado de validação de tamanho (máx. 5MB) no Front-end para prevenir erros de servidor.

----------

##  Deploy e Conectividade

A aplicação está disponível em: **https://mtb2bludhill.netlify.app**

###  Considerações sobre o Ambiente de Produção

É fundamental observar que, embora o Front-end esteja publicado via **Netlify**, o carregamento de dados em produção depende da conectividade com o backend. Como a API fornecida para o desafio opera em ambiente local (`localhost:3000`), o site em produção apresentará um estado de "Carregando" permanente devido a:

1.  **Mixed Content**: Bloqueio de segurança do navegador que impede chamadas de um domínio HTTPS (Netlify) para um IP/Porta HTTP local.
    
2.  **Rede**: O servidor do Netlify não possui rota para o ambiente Docker local do avaliador.
    

**Para a experiência completa, a execução local é recomendada.**

----------

##  Como Executar o Projeto

### Pré-requisitos

-   Node.js (v20+)
    
-   Docker (para rodar a API fornecida pela B2Bit)
    

### Passo a Passo

1.  **Clonar o repositório:**
    
    Bash
    
    ```
    git clone https://github.com/ludhill/miniTwitterB2Bit.git
    cd miniTwitterB2bitLudhill
    
    ```
    
2.  **Instalar dependências:**
    
    _O projeto utiliza o Vite 8, o que exige a flag de peer dependencies no npm:_
    
    Bash
    
    ```
    npm install --legacy-peer-deps
    
    ```
    
3.  **Configurar a API:**
    
    Certifique-se de que o container Docker da API está rodando na porta `3000`.
    
4.  **Rodar o ambiente de desenvolvimento:**
    
    Bash
    
    ```
    npm run dev
    
    ```
    
5.  Acesse `http://localhost:5173` no seu navegador.
    

----------

##  Desenvolvedor

**Lucas (Ludhill)** - Desenvolvedor Front-end focado em React e ecossistema TypeScript.