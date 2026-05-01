@../CLAUDE.md

# Guardião — Web App

## Contexto deste Repositório
Dashboard web da plataforma Guardião. Interface para Super Admin, Admins de empresa e usuários com acesso via browser.

## Stack (decidida — 2026-05-01)
- **Build/dev:** Vite 6
- **Linguagem:** TypeScript 5
- **UI Framework:** React 18
- **Roteamento:** React Router 7
- **Design System:** MUI v6 (Material Design 3) + `@mui/icons-material`
- **Tabelas/grids:** `@mui/x-data-grid`
- **Gráficos:** `@mui/x-charts`
- **Estado servidor:** TanStack Query v5
- **Estado cliente:** Zustand v5
- **Forms:** React Hook Form + Zod
- **Auth:** Firebase Authentication
- **Database:** Firebase Realtime Database
- **Testes:** Vitest 3 + Testing Library
- **Lint/format:** ESLint 9 + Prettier 3

### Por que React+Vite (e não Flutter Web)?
- Dashboard administrativo web nativo (não app mobile)
- WCAG 2.1 obrigatório → HTML semântico (Flutter Web renderiza em Canvas)
- Bundle menor (~150KB gzip vs ~2MB do Flutter Web)
- Ecosistema de dashboards maduro (MUI X DataGrid pronto pra uso)
- Reuso com guardiao-app é mínimo (~10% modelos) — não justifica trade-off

## Multi-ambiente (Vite modes)
| Modo | Comando | Firebase Project |
|---|---|---|
| development | `npm run dev` | `guardiao-iot-dev` |
| uat | `npm run dev:uat` / `npm run build:uat` | `guardiao-iot-uat` |
| production | `npm run build` | `iotemp-sensor` |

Variáveis em `.env.development`, `.env.uat`, `.env.production` (versionados sem secrets).
Para preencher `VITE_FIREBASE_API_KEY` etc:
```bash
firebase apps:sdkconfig WEB --project guardiao-iot-dev
```

## Padrões de UI/UX Obrigatórios
- Material Design 3 como base
- Atomic Design para organização de componentes
- WCAG 2.1 para acessibilidade
- Responsivo: desktop, tablet e mobile
- Dark mode suportado desde o início

## Estrutura Esperada (React/TS)
```
guardiao-web/
    ├── src/
    │   ├── core/               # Config, theme, constants, utils
    │   ├── features/           # Módulos por feature
    │   │   ├── auth/
    │   │   ├── dashboard/
    │   │   ├── devices/
    │   │   ├── companies/      # Gestão de empresas (Super Admin)
    │   │   ├── users/
    │   │   └── reports/
    │   ├── shared/             # Componentes, hooks e serviços compartilhados
    │   │   ├── components/     # Atomic: atoms, molecules, organisms
    │   │   ├── hooks/
    │   │   └── services/
    │   └── main.tsx
    ├── public/
    ├── test/
    ├── index.html
    ├── package.json
    ├── .gitignore
    ├── README.md
    └── CHANGELOG.md
```

## Dashboards por Nível de Acesso
- **Super Admin:** todas as empresas, todos os usuários, todos os dispositivos
- **Admin de Empresa:** dispositivos e usuários da sua empresa
- **Usuário:** seus próprios dispositivos

## GitHub
- Repositório: `guardiao-web`
- Branch principal: `main`
- Workflow: ver `../DEVELOPMENT.md`

## Checklist de Qualidade
- [ ] Lint sem erros
- [ ] Testes passando
- [ ] Testado em Chrome, Firefox, Safari
- [ ] Responsivo em mobile, tablet e desktop
- [ ] Acessibilidade verificada (WCAG 2.1)
- [ ] Dark mode funcionando
