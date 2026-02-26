# Nexus - Dashboard Financeiro

Sistema de gestão financeira que permite visualizar usuários, gerenciar saldos e registrar movimentações de ativos (BRL, BTC, ETH, USDT).

## Tecnologias Utilizadas

- **React 18** (Vite)
- **TypeScript** (Tipagem estrita para segurança de dados)
- **Tailwind CSS** (Estilização responsiva e UI moderna)
- **React Router Dom** (Gerenciamento de rotas SPA)
- **Context API** (Gerenciamento de estado global para mocks)

## Requisitos Implementados

- [x] **Tela de Login**: Interface organizada com navegação para a Home.
- [x] **Dashboard (Home)**: Resumo de saldos e últimas 5 movimentações.
- [x] **Gestão de Usuários**: Listagem de 10 usuários com busca, filtros por status e paginação.
- [x] **Operações Financeiras**: Telas de Depósito, Saque (com validação de saldo) e Conversão (integração com API externa).
- [x] **Mocks Estruturados**: 10 usuários e 30 transações iniciais.
- [x] **Responsividade**: Layout adaptável para Desktop e Mobile.

## Como Executar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Rianzynx/nexus-challenge.git
   ```

2. **Entre na pasta do projeto:**
   ```bash
    cd nexus-challenge
   ```

3. **Instale as dependências:**
  ```bash
    npm install
   ```

4. **Execute o ambiente de desenvolvimento:**
  ```bash
    npm run dev
   ```
   O projeto estará disponível em http://localhost:5173

## Decisões Técnicas

### 1. Mocks em TS vs JSON
Optei por utilizar arquivos `.ts` para os mocks em vez de `.json` para aproveitar o sistema de tipos do TypeScript, garantindo que os dados sigam as interfaces definidas.

### 2. Context API
Utilizei Context API para simular o comportamento de um banco de dados em memória, permitindo que novos depósitos ou saques reflitam instantaneamente no saldo global.

### 3. Arquitetura de Pastas
Organizei o projeto em /components, /context, /mocks, /pages, /services e /types para manter o código limpo e escalável.