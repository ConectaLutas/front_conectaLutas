# 🥋 Conecta Lutas

Plataforma web para gestão de campeonatos de Lutas, com funcionalidades como cadastro de eventos, inscrições de atletas, geração automática de chaves.

---

## 🔗 Links Importantes

- 🔗 **Produção:** [conectalutas.netlify.app](https://conectalutas.netlify.app/)
- 💻 **Repositório:** [GitHub Conecta Lutas](https://github.com/ConectaLutas?tab=repositories)
- 📘 **Documentação da API:** [Swagger API](https://api-conectalutas.onrender.com/index.html)
- 🎨 **Figma (Design):** [Protótipo no Figma](https://www.figma.com/design/GzKxuvujzeReJ3KLgFHfkd/Untitled?node-id=0-1&p=f&t=s7NSq7EbysF0BWx5-0)
- 📋 **Planejamento:** [Notion do Projeto](https://www.notion.so/1a85e27ae34280bcb100dff9fffb2af2?pvs=21)

---

## 👥 Equipe

| Nome             | Responsabilidade       |
|------------------|------------------------|
| Jeniffer Souza   | Backend                |
| Rafael           | Frontend               |
| Kayque Augusto   | Design UI/UX           |
| Eric Lucca       | Testes                 |
| Adriano Reis     | Testes                 |

---

## 📌 Funcionalidades Principais

### ✅ MVP (Versão Inicial)

- Cadastro de Atletas e Campeonatos
- Geração Automática de Chaves 
- Visualização das Chaves por PDF

### 🔄 Funcionalidades Futuras

- Registro de Pontuação em Tempo Real
- Atualização automática das chaves com resultados
- Exibição de Rankings por atleta
- Histórico de Lutas

---

## 💡 Tecnologias Utilizadas

### Frontend

- **React**
- **Axios** (requisições HTTP)
- **React Router DOM** (rotas)
- **Netlify** (deploy)

### Backend

- **C# com ASP.NET Core**
- **Entity Framework Core**
- **Swagger** (documentação)
- **JWT** (autenticação)
- **Render** (deploy da API)

### Banco de Dados

- **MySQL**
- **AWS RDS** (hospedagem)

---

## 🧱 Arquitetura

O projeto foi desenvolvido utilizando uma **Arquitetura em Camadas**, separando responsabilidades em:

- **Frontend (Apresentação)**: Interface com usuários e integração com a API
- **Backend (Lógica de Negócio)**: Processamento de regras, autenticação, geração de chaves etc.
- **Banco de Dados**: Persistência de dados (usuários, campeonatos, inscrições, resultados)

---

## 🚀 Como Executar o Projeto

### 🔧 Requisitos

- Node.js 18+
- .NET SDK 8+
- MySQL Server

###  Frontend

```bash

cd frontend
npm install
npm run start

qualidade no commit e versão 
## 🔄 Fluxo de Trabalho com Git

Nosso projeto segue uma estratégia de Git com foco em clareza, organização e rastreabilidade:

### 📁 Padrão de Branches

- `main`: branch principal
- `feature/<nome>`: nova funcionalidade
- `fix/<nome>`: correção de erro
- `refactor/<nome>`: refatoração de código
- `hotfix/<nome>`: correção urgente em produção

### 💬 Padrão de Commits

- `feat`: nova funcionalidade
- `fix`: correção de bug
- `docs`: mudanças na documentação
- `refactor`: melhoria no código
- `test`: criação ou melhoria de testes
- `chore`: tarefas técnicas

### 📌 Versionamento com Releases

Usamos releases GitHub para marcar versões principais do sistema:

- `v1.0.0`: versão inicial funcional
- `v1.1.0`: novas funcionalidades
- `v1.1.1`: correções pequenas

A descrição da release apresenta o que mudou (changelog).
## 🔁 Fluxo de Pull Requests

Nosso grupo segue um fluxo padronizado de contribuição via Pull Requests (PRs), com os seguintes passos:

1. Crie uma branch nomeada por funcionalidade, exemplo: `feature/inscricao-campeonato`
2. Realize os commits com mensagens descritivas
3. Abra uma PR para a branch `main`
4. Preencha o **template de PR**, marcando o checklist
5. Solicite revisão de pelo menos **um membro do grupo**
6. Revise o código de outros membros, comentando sugestões ou problemas encontrados
7. Aplique as correções sugeridas (se houver)
8. Após aprovação, a PR pode ser **mesclada** na `main`

### ✍️ Nomeclatura de branches

- `feature/` – novas funcionalidades
- `fix/` – correções
- `hotfix/` – correções urgentes na `main`
- `refactor/` – melhorias sem mudança de funcionalidade

### 💬 Exemplo de commit

```bash
feat: adiciona botão de inscrição no card de campeonato
fix: corrige erro no cálculo de chaves ao cadastrar lutas
# 📌 Descrição da Pull Request

Descreva brevemente o que esta PR faz. Explique o contexto e por que essa mudança é necessária.

---

## ✅ Checklist

- [ ] O código segue o padrão de estilo do projeto
- [ ] Testes foram escritos ou atualizados para cobrir as mudanças
- [ ] O sistema foi testado manualmente e está funcionando
- [ ] Não há conflitos com a branch `main`
- [ ] A documentação foi atualizada (quando necessário)
- [ ] Esta PR está relacionada a uma issue? Se sim, link abaixo.

---

## 🔗 Issue Relacionada

Closes #[número da issue]

---

## 🧪 Evidências

Inclua capturas de tela, logs, prints dos testes Cypress ou GIFs, se aplicável.

---

## 🗣️ Revisores

Peça revisão de pelo menos uma pessoa do grupo:

@colega1  
@colega2


🧪 Rodando os Testes
O projeto utiliza Jest e React Testing Library para testes automatizados.

Para rodar todos os testes:

Você pode rodar um teste específico usando:

Exemplo:

🧹 Rodando o Linter
O projeto utiliza ESLint para padronização de código.

Instalando o ESLint
Se aparecer erro dizendo que o comando eslint não foi encontrado, instale o ESLint:

Adicionando o script no package.json
Se não existir o script lint no seu package.json, adicione em "scripts":

Rodando o linter
Para rodar o linter, use:

Regras do Linter
As principais regras de padronização usadas no projeto são:

Obrigatório uso de ponto e vírgula:
"semi": ["error", "always"]
Aviso para variáveis não utilizadas:
"no-unused-vars": ["warn"]
Aviso para funções vazias:
"no-empty-function": ["warn"]
Preferência por funções como expressão:
"func-style": ["warn", "expression"]
Preferência por arrow functions em callbacks:
"prefer-arrow-callback": ["warn"]
Arrow function sem chaves se possível:
"arrow-body-style": ["warn", "as-needed"]
Aviso para uso de console.log:
"no-console": ["warn"]
Essas regras estão configuradas no bloco "eslintConfig" do package.json do projeto.

🛠️ Dicas
Sempre rode o linter antes de subir código para manter o padrão do projeto.
Mantenha os testes atualizados ao criar novas funcionalidades.
Consulte a documentação da API no Swagger para detalhes dos endpoints.