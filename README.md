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


