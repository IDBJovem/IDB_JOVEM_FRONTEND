# IDB Jovem - Frontend

Este é o repositório do frontend do projeto IDB Jovem, desenvolvido para fornecer uma interface moderna e responsiva para a gestão e visualização de eventos, voluntários e produtos relacionados à organização.

## Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias e bibliotecas principais:

- **[React 19](https://react.dev/)**: Biblioteca JavaScript para criação da interface de usuário.
- **[Vite](https://vitejs.dev/)**: Ferramenta de build extremamente rápida e servidor de desenvolvimento.
- **[Tailwind CSS 4](https://tailwindcss.com/)**: Framework de CSS utilitário para estilização rápida e responsiva.
- **[React Router DOM](https://reactrouter.com/)**: Biblioteca para gerenciamento de rotas e navegação da aplicação.
- **[Lucide React](https://lucide.dev/)**: Biblioteca de ícones modernos e limpos.
- **[Playwright](https://playwright.dev/)**: Framework de testes End-to-End (E2E) para testar fluxos de interface com precisão.
- **[NYC / Istanbul](https://istanbul.js.org/)**: Ferramenta de instrumentação e relatório para cobertura de testes.

## Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina. O projeto foi estruturado para ser utilizado com o gerenciador de pacotes NPM.

## Instalação

Clone o repositório e instale as dependências:

```bash
npm install
```

## Comandos Disponíveis

Aqui estão os comandos principais para operar o projeto no dia a dia.

### 1. Rodar o Site Localmente (Servidor de Desenvolvimento)

Para iniciar a aplicação em ambiente de desenvolvimento (com Hot Module Replacement - HMR):

```bash
npm run dev
```

> O site estará disponível, por padrão, em `http://localhost:5173`.

### 2. Rodar Todos os Testes

A suíte completa de testes E2E com Playwright pode ser executada com o seguinte comando:

```bash
npx playwright test
```

### 3. Rodar Testes com Relatório de Cobertura (Coverage)

Para rodar todos os testes e em seguida extrair um relatório detalhado de cobertura de código do React:

```bash
npm run test:coverage
```

> Ao final da execução, um relatório de cobertura será exibido no terminal e um arquivo HTML mais detalhado poderá ser gerado na pasta de relatórios.

### 4. Rodar um Teste Específico

Se você estiver desenvolvendo ou corrigindo uma funcionalidade e precisar rodar apenas um arquivo de teste específico, informe o caminho do arquivo:

```bash
npx playwright test tests/layout/header.spec.js
```
