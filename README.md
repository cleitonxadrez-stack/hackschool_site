# HackPerfil — HACK SCHOOL®

Sistema real de cadastro, login, teste e resultado do **HackPerfil**: o teste de 12 perguntas que
descobre qual dos 5 Perfis de Talentos HACK SCHOOL® (Creator, Builder, Connector, Tech Maker, Leader)
predomina em cada aluno.

Stack: **Next.js 14 (App Router) + TypeScript + Prisma + PostgreSQL + NextAuth**, pensado para deploy
na **Vercel**.

## O que o sistema faz

- **Cadastro** (`/cadastro`) — cria uma conta real (nome, e-mail, senha, escola, série), senha
  armazenada com hash bcrypt, nunca em texto puro.
- **Login** (`/login`) — autenticação via NextAuth (sessão JWT).
- **Teste** (`/teste`, protegido — exige login) — 12 perguntas, uma opção por perfil em cada uma,
  avança automaticamente ao responder.
- **Resultado** (`/resultado/[id]`) — calculado e salvo no banco de dados no momento do envio,
  associado ao usuário. Cada pessoa só consegue ver o próprio resultado (checagem de propriedade no
  servidor).

Os dados de cada usuário (nome, e-mail, senha com hash, escola, série) e de cada resultado de teste
(perfil, pontuação em cada um dos 5 perfis, respostas) ficam guardados de verdade no banco Postgres —
não é mais um protótipo simulado.

## Rodando localmente

Pré-requisitos: Node.js 18+ e um banco PostgreSQL (pode ser local, ou já usar direto um banco na nuvem
como Neon/Vercel Postgres, mesmo em desenvolvimento).

```bash
npm install
cp .env.example .env
# edite o .env com sua DATABASE_URL e gere um NEXTAUTH_SECRET (openssl rand -base64 32)

npx prisma db push     # cria as tabelas no banco a partir de prisma/schema.prisma
npm run dev            # abre em http://localhost:3000
```

## Publicando na Vercel

### 1. Suba o código para o GitHub

Crie um repositório novo (pode ser privado) e suba esta pasta para ele. É o jeito mais simples de
conectar com a Vercel — a cada push, ela publica uma nova versão automaticamente.

### 2. Crie o banco de dados

Dentro do painel da Vercel:

1. Vá em **Storage → Create Database**.
2. Escolha **Postgres** (é um banco Neon, gerenciado pela própria Vercel).
3. Depois de criado, na aba **Connect Project**, conecte esse banco ao projeto do HackPerfil — a
   Vercel preenche a variável `DATABASE_URL` sozinha.

*(Alternativa: criar o banco direto em [neon.tech](https://neon.tech) ou
[supabase.com](https://supabase.com) e colar a connection string manualmente na variável
`DATABASE_URL` — funciona igual, é só Postgres.)*

### 3. Importe o projeto na Vercel

1. **Add New → Project**, selecione o repositório do GitHub.
2. A Vercel detecta que é Next.js automaticamente — não precisa mexer em nada no build.
3. Em **Environment Variables**, adicione (se ainda não vieram do passo 2):
   - `DATABASE_URL` — a connection string do banco Postgres.
   - `NEXTAUTH_SECRET` — gere com `openssl rand -base64 32` (ou qualquer texto aleatório longo).
   - `NEXTAUTH_URL` — a URL final do site, ex. `https://teste.hackschool.app` (se ainda não tiver
     domínio definido, pode colocar a URL `.vercel.app` que a própria Vercel gera e trocar depois).
4. Clique em **Deploy**.

### 4. Crie as tabelas no banco de produção

Depois do primeiro deploy, rode uma vez (com o `.env` local apontando para o banco de produção, ou via
`vercel env pull` para puxar as variáveis):

```bash
npx prisma db push
```

Isso cria as tabelas `User` e `TestResult` no banco. Só precisa rodar de novo se o `schema.prisma`
mudar no futuro.

### 5. Domínio próprio (opcional)

Em **Project Settings → Domains**, adicione o subdomínio desejado (ex. `teste.hackschool.app`) e
aponte o DNS conforme as instruções da própria Vercel. Depois, atualize a variável `NEXTAUTH_URL` para
esse domínio.

## Estrutura do projeto

```
src/
  app/
    page.tsx                 → página inicial
    cadastro/page.tsx        → criar conta
    login/page.tsx           → entrar
    teste/page.tsx           → o questionário (protegido por login)
    resultado/[id]/page.tsx  → resultado de um teste específico (protegido + checagem de dono)
    api/
      register/route.ts      → cria usuário
      teste/route.ts         → calcula e salva o resultado
      auth/[...nextauth]/    → NextAuth (login/sessão)
  lib/
    perfis.ts                → os 5 perfis, as 12 perguntas e o cálculo do resultado
    auth.ts                  → configuração do NextAuth
    prisma.ts                → cliente do banco de dados
  middleware.ts               → exige login para acessar /teste
prisma/
  schema.prisma               → modelo do banco (User, TestResult)
```

## Editar as perguntas ou os perfis

Tudo fica em `src/lib/perfis.ts` — é só editar o texto das perguntas, das opções, ou a descrição de
cada perfil. Não precisa mexer em nenhuma outra parte do sistema.
