## Como Executar Localmente no Windows 🖥️

### Pré-requisitos

Antes de começar, certifique-se de que você tem o seguinte instalado em sua máquina Windows:

1. **Node.js**: Baixe e instale o Node.js a partir de [nodejs.org](https://nodejs.org/). Isso também instalará o npm (Node Package Manager).
2. **Git**: Baixe e instale o Git a partir de [git-scm.com](https://git-scm.com/).

### Passo 1: Clonar o Repositório

Abra o seu prompt de comando (cmd) ou PowerShell e execute o seguinte comando para clonar o repositório:

```bash
git clone https://github.com/kaufon/Pet-Lovers.git
```

### Passo 2: Navegar até o Diretório do Projeto

Mude para o diretório do projeto:

```bash
cd  Pet-Lovers/
```

### Passo 2: Instalar Dependências

Execute o seguinte comando para instalar as dependências necessárias:

```bash
npm install
```
### Passo 3: Criar o banco de dados

Execute o seguinte comando dentro da pasta `apps/server`:

```bash
npm run db:generate
```


### Passo 4: Executar o Projeto

Você pode executar o projeto usando o seguinte comando na pasta `Pet-Lovers`:

```bash
npm run dev
```

Este comando iniciará a aplicação, e você deverá ver uma saída indicando que a aplicação cliente e servidor está em execução.

### Passo 4: Acessar a Aplicação

Abra seu navegador e navegue até `http://localhost:3000` para acessar a aplicação web.

**🚧Caso haja algum erro ao executar as dependências do projeto, rode o comando `npm install` na pasta `apps/server`  e `apps/web` separadamente e tente executar o projeto novamente.🚧**

<p align="center">
  Feito com ❤️ por Kauan Fonseca 
</p>

