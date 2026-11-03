# 🌬️ Zefi – Avatar inteligente do Soul Up

![Zefi](Zefi/public/imgs-zefi/logo_zefi_header_footer.png)

O **Zefi** é o avatar inteligente do **Soul Up** que incentiva hábitos sustentáveis de forma gamificada. O usuário conta no chat o que fez de bom pelo planeta, o Zefi avalia a ação, identifica a categoria e dá pontos. Ele também sugere missões personalizadas, e os pontos acumulados podem ser trocados por recompensas do Soul Up.

Este repositório contém o **front-end** (Sprint 4 – Front-End Design Engineering), que consome a API REST em Java do projeto.

## 🛠️ Tecnologias utilizadas

- **React 19** + **TypeScript** + **Vite** (SPA)
- **Tailwind CSS 4** (estilização e responsividade)
- **React Router** (rotas estáticas, protegidas e página 404)
- **React Hook Form**
- **Context API** e hooks (`useState`, `useEffect`, `useContext`, `useMemo`) para estado e sessão
- **Fetch API** em uma camada de serviços (`src/services`)
- **Oxlint** (qualidade de código)
- **Git / GitHub / Git Flow** e deploy na **Vercel**

Back-end (repositório separado): **Java 21 + Spring Boot + Oracle Database**, publicado no **Render**.

## 📁 Estrutura de pastas

```
Zefi/
├── public/imgs-zefi/        imagens e ícones do Zefi
├── src/
│   ├── components/
│   │   ├── layout/          Header, Footer e Layout
│   │   ├── missoes/         CardMissao, FiltroMissoes, ModalDetalhesMissao
│   │   ├── conquistas/      MedalhaConquista, PainelConquistas
│   │   ├── feed/            CompositorPost, PostAcao, CartaoMissaoZefi, BarraLateral
│   │   ├── perfil/          AvatarUsuario, CabecalhoPerfil, FormEditarPerfil
│   │   ├── recompensas/     CardRecompensa, ProximaRecompensa
│   │   ├── ui/              Spinner, Estados, Accordion, ícones e estilos
│   │   └── zefi/            ZefiAvatar, BalaoFala, BalaoMensagem
│   ├── context/             sessão do usuário (UsuarioContext)
│   ├── data/                metas das conquistas e níveis da jornada
│   ├── hooks/               useRequisicao, useConquistas, usePerfilSocial
│   ├── pages/               Inicio (Home/Feed), Missões, Recompensas, Chat, Perfil,
│   │                        Login, Cadastro, Sobre, FAQ, Contato, Integrantes e 404
│   ├── routes/              AppRoutes e RotaProtegida
│   ├── services/            chamadas à API (api, usuario, ação, missão, recompensa)
│   ├── types/               tipos e interfaces TypeScript
│   └── utils/               utilitários (CPF, conquistas, imagem, tempo)
├── index.html
├── vercel.json              reescrita de rotas da SPA na Vercel
└── vite.config.ts
```

## ✨ Funcionalidades

- **Cadastro e login** com sessão por token e rotas protegidas
- **Feed (página inicial para quem está logado)**: publique uma ação sustentável, receba pontos e o comentário do Zefi, veja sua linha do tempo e peça uma missão sob medida
- **Perfil editável**: foto, bio, nome, cidade e categoria de interesse
- **Conquistas em níveis**: medalhas bronze, prata e ouro (ações, pontos, categorias e constância) e nível da jornada (Semente → Guardião do Planeta)
- **Recompensas**: página dedicada com saldo, progresso até cada recompensa e resgate com confirmação
- **Missões**: listagem, busca por nome, filtro por categoria e detalhes
- **Chat com o Zefi**: o usuário relata uma ação e recebe categoria, pontos e progresso na hora
- Páginas institucionais: Sobre, FAQ, Contato e Integrantes

> Observação: foto e bio ficam salvas no navegador (localStorage), pois a API ainda não possui esses campos; o feed exibe as ações do próprio usuário.

## 🖼️ Imagens do projeto

| Feed | Recompensas |
|---|---|
| ![Feed](Zefi/public/imgs-zefi/print_feed.png) | ![Recompensas](Zefi/public/imgs-zefi/print_recompensas.png) |

| Chat com o Zefi | Perfil |
|---|---|
| ![Chat](Zefi/public/imgs-zefi/uso_chat.png) | ![Engajamento](Zefi/public/imgs-zefi/uso_nivel_engajamento.png) |

## 🚀 Como usar

| Item | Link |
|---|---|
| 🌐 Aplicação publicada (Vercel) | https://projeto-zefi.vercel.app |
| 💻 Repositório do front-end (GitHub) | https://github.com/FelipeSilvaPassos/Projeto-Zefi |
| 🔌 Repositório da API Java (GitHub) | https://github.com/FelipeSilvaPassos/projeto-zefi-api |
| ☁️ API publicada (Render) | https://projeto-zefi-api.onrender.com |
| 🎥 Vídeo de apresentação (YouTube) | **[PREENCHER: link do vídeo]** |

> A API está no plano gratuito do Render: a primeira requisição pode levar até cerca de 50 segundos para "acordar".

### Rodando localmente

**Requisitos:** Node.js 20 ou superior e npm.

```bash
# 1. clone o repositório
git clone https://github.com/FelipeSilvaPassos/Projeto-Zefi.git
cd Projeto-Zefi/Zefi

# 2. instale as dependências
npm install

# 3. (opcional) aponte para a API; sem isso, usa http://localhost:8080
echo "VITE_API_URL=https://projeto-zefi-api.onrender.com" > .env

# 4. rode em modo de desenvolvimento
npm run dev        # http://localhost:5173

# build de produção
npm run build
```

## 👥 Autores e créditos

| | Nome | RM | Turma | GitHub | LinkedIn |
|---|---|---|---|---|---|
| **[PREENCHER: foto]** | Felipe Passos | 569411 | **[PREENCHER]** | [FelipeSilvaPassos](https://github.com/FelipeSilvaPassos) | [Felipe Passos](https://www.linkedin.com/in/felipe-passos-110668397/) |
| **[PREENCHER: foto]** | Gabriel Canevari | 570730 | **[PREENCHER]** | [Canevari2](https://github.com/Canevari2) | [Gabriel Canevari](https://www.linkedin.com/in/gabriel-canevari-476825382/) |

Projeto desenvolvido para o Challenge 2026 da **FIAP** (Análise e Desenvolvimento de Sistemas), em parceria com o **Soul Up**.

## 📬 Contato

- E-mail da equipe: **[PREENCHER: e-mail de contato]**
- GitHub: [FelipeSilvaPassos](https://github.com/FelipeSilvaPassos) · [Canevari2](https://github.com/Canevari2)