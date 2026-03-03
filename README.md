# Nexus - Dashboard Financeiro

Sistema de gestão financeira que permite visualizar usuários, gerenciar saldos e registrar movimentações de ativos (BRL, BTC, ETH, USDT).

## Tecnologias Utilizadas

- **React 18** (Vite)
- **TypeScript** (Tipagem estrita para segurança de dados)
- **Tailwind CSS** (Estilização responsiva e UI moderna)
- **React Router Dom** (Gerenciamento de rotas SPA)
- **Context API** (Gerenciamento de estado global para mocks)
- **Charts** (ApexCharts - Animações suaves e responsividade)
- **API** (CoinGecko Demo API - Market Data)

## Requisitos Implementados

- [x] **Tela de Login**: Interface organizada com navegação para a Home.
- [x] **Dashboard (Home)**: Resumo de saldos e últimas 5 movimentações.
- [x] **Gestão de Usuários**: Listagem de 10 usuários com busca, filtros por status e paginação.
- [x] **Operações Financeiras**: Telas de Depósito, Saque (com validação de saldo) e Conversão (integração com API externa).
- [x] **Mocks Estruturados**: 10 usuários e 30 transações iniciais.
- [x] **Visualização de Dados**: Integração com ApexCharts para exibir tendências de mercado dos últimos 7 dias.
- [x] **Dados em Tempo Real**: Consumo da API CoinGecko para cotações e conversões.
- [x] **Dual Theme**: Sistema de troca de temas (Dark/Light) com persistência no localStorage.
- [x] **Smart Caching**: Implementação de cache de 30 minutos para dados de mercado, reduzindo o consumo de banda e evitando limites de taxa de API.
- [x] **Clean Architecture**: Utilizando Custom Hooks (useConversion, useTheme) e separação de interesses.

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

4. **Configuração de API:**
   Crie um arquivo .env na raiz e adicione sua chave
   ```bash
    VITE_COINGECKO_API_KEY=sua_chave_aqui
   ```

5. **Execute o ambiente de desenvolvimento:**
   ```bash
    npm run dev
   ```
   O projeto estará disponível em http://localhost:5173

## Estrutura do Projeto

```text
src/
 ├──  assets/          # Ativos estáticos (Logos e backgrounds Light/Dark)
 ├──  components/      # Componentes de UI (PriceChart, Sidebar, OptionSelect)
 ├──  context/         # Gerenciamento de estado global (Saldos e Transações)
 ├──  hooks/           # Lógica de negócio isolada (useConversion, useTheme)
 ├──  pages/           # Páginas principais da aplicação (Rotas)
 ├──  services/        # Configurações de API e instâncias de busca
 ├──  types/           # Definições de interfaces e tipos TypeScript
 └──  utils/           # Funções auxiliares e formatadores
 ```

## Decisões Técnicas

### 1. Custom Hooks vs Logic in Components
Extrai toda a lógica complexa (como cálculos de conversão e busca de API) para Hooks. Isso torna os componentes puramente visuais e facilita a manutenção.

### 2. Persistência de Preferências
Utilizei useEffect sincronizado com o localStorage para que a escolha do tema do usuário seja mantida mesmo após fechar o navegador.

### 3. Mocks em TS vs JSON
Optei por utilizar arquivos `.ts` para os mocks em vez de `.json` para aproveitar o sistema de tipos do TypeScript, garantindo que os dados sigam as interfaces definidas.

### 4. Context API
Utilizei Context API para simular o comportamento de um banco de dados em memória, permitindo que novos depósitos ou saques reflitam instantaneamente no saldo global.
