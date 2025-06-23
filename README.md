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
- Categorias por idade, peso e graduação
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
- **TailwindCSS** (estilização)
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