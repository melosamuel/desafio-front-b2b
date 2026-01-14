## 🛠️ Stack Utilizada

Construí o projeto usando tecnologias modernas e performáticas do React:

* **Core:** React (com vite)
* **Linguagem:** TypeScript
* **Estilização:** TailwindCSS
* **Roteamento:** React Router DOM
* **Ícones:** Lucide react

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para executar a aplicação localmente:

1.  **Clone o repositório:**
    ```bash
    git clone git@github.com:melosamuel/desafio-front-b2b.git
    cd challenge
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```

4.  **Acesse no navegador:**
    O projeto estará rodando geralmente em `http://localhost:5173`.

---

## 🎨 Decisões de UI/UX e Desenvolvimento

Para construir esse projeto segui uma abordagem iterativa, focando em uma UX fluida UI limpa e simples, comum em produtos SaaS B2B.

### 1. Identidade Visual e Layout
* **Estética Minimalista B2B:** Optei por uma paleta de cor neutra (`slate`) com toques em **Azul Corporativo** para transmitir confiança e profissionalismo. Também fiz bastante uso de 'white spaces' para dar um "alívio visual".
* **Navegação Persistente:** Implementei um layout com uma **Sidebar Fixa**, para facilitar a navegação que um site com poucas páginas permite.
* **Dashboard Resumido:** Projetei a tela inicial para fornecer "Clareza ao Olhar", usando de cards com cores semânticas (Laranja para alertas de refund, azul para pendências e verde para sucesso).

### 2. Experiência na Inbox (Core Feature)
* **Split View (Mestre-Detalhe):** Implementei um sistema visual básico inspirado em SMTPs como outlook e gmail.
* **Chat Visual:** A forma como o usuário enxerga as threads de mensagens está bem intuitiva, com clareza sobre quem enviou a mensagem. "Whatsapp like".

### 3. Refatoração e Lógica (Contribuições Técnicas)
Embora a base visual tenha sido gerada com foco em rapidez, o projeto passou por uma etapa crítica de **Refatoração e Correção de Lógica** para garantir funcionalidade real no front-end:

* **Gerenciamento de Estado (State Management):** Devido as limitações da IA, refatorei as variáveis para usar `useState`, possibilitando atualizações de listas de email.
* **Feedback Visual de Status:** Implementei 'badges' tanto para identificar o id do pedido, quanto para indicar se o e-mail foi respondido ou se é novo.
* **Lógica de Envio de E-mail (Outgoing vs Incoming):** Implementei lógica para identificar o autor da mensagem (ou do e-mail). Adaptei a interface para renderizar corretamente o remetente e o destinatário dependendo se o e-mail é de entrada ou saída (`isOutgoing`).

## 📁 Estrutura de Pastas

* `src/layouts`: Componentes de layout global (Sidebar, Header).
* `src/components`: Componentes gerais.
* `src/pages`: Telas principais da aplicação.
* `src/lib`: Mock data e tipos utilitários.
* `src/router.tsx`: Configuração centralizada de rotas.

---

> Projeto desenvolvido como parte de um desafio técnico.
> Melhorias, caso fosse pedido: 
    - Implementação de 'Toast Notification' para mensagens de sucesso e/ou erro.
    - Implementação de relative path ('@' como alias para a pasta 'src')