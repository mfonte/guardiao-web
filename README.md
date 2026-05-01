# guardiao-web

Dashboard web da plataforma **Guardião IoT**. Interface para monitoramento, gestão de dispositivos, usuários e empresas, com dashboards diferenciados por nível de acesso.

---

## Níveis de Acesso

| Nível | Visibilidade |
|-------|-------------|
| Super Admin | Todas as empresas, usuários e dispositivos |
| Admin de Empresa | Empresa, usuários internos e dispositivos |
| Usuário | Seus próprios dispositivos |

---

## Pré-requisitos

- Node.js 20+
- npm 10+
- Conta Firebase com acesso aos projetos `guardiao-iot-dev`, `guardiao-iot-uat` e `iotemp-sensor`

## Stack

React 18 + TypeScript 5 + Vite 6, MUI v6, Firebase, TanStack Query, Zustand, React Hook Form + Zod.
Detalhes em [CLAUDE.md](./CLAUDE.md).

---

## Configuração

1. Clone o repositório:
```bash
git clone https://github.com/mfonte/guardiao-web.git
cd guardiao-web
```

2. Instale as dependências:
```bash
npm install
```

3. Preencha as credenciais Firebase nos `.env.{development,uat,production}`:
```bash
firebase apps:sdkconfig WEB --project guardiao-iot-dev
# Cole apiKey, appId, messagingSenderId em .env.development
```

4. Execute em modo de desenvolvimento:
```bash
npm run dev          # → guardiao-iot-dev
npm run dev:uat      # → guardiao-iot-uat
```

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Dev server (mode=development → guardiao-iot-dev) |
| `npm run dev:uat` | Dev server (mode=uat → guardiao-iot-uat) |
| `npm run build` | Build produção (→ iotemp-sensor) |
| `npm run build:uat` | Build UAT (→ guardiao-iot-uat) |
| `npm run build:dev` | Build dev (→ guardiao-iot-dev) |
| `npm run preview` | Serve `dist/` localmente |
| `npm run lint` | ESLint |
| `npm run typecheck` | tsc --noEmit |
| `npm test` | Vitest |
| `npm run format` | Prettier |

---

## Padrões de Desenvolvimento

- **Material Design 3** como design system
- **Atomic Design** para organização de componentes
- **WCAG 2.1** para acessibilidade
- **Feature-first** para organização de código

---

## Desenvolvimento

Siga o fluxo definido em [`../DEVELOPMENT.md`](../DEVELOPMENT.md).

```bash
# Instalar GSD
npx get-shit-done-cc --claude --local

# Instalar SDD
npx cc-sdd@latest --claude --lang pt

# Iniciar Claude Code
claude
```

---

## Versão Atual

Veja [CHANGELOG.md](CHANGELOG.md) para histórico de versões.

---

## Licença

Proprietary — Guardião IoT Platform
