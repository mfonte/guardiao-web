@../CLAUDE.md

# Guardião — Web App

## Contexto deste Repositório
Dashboard web da plataforma Guardião. Interface para Super Admin, Admins de empresa e usuários com acesso via browser. A ser implementado do zero.

## Stack (a definir — opções)
- **Opção A:** React + TypeScript + Vite
- **Opção B:** Flutter Web
- **Auth:** Firebase Authentication
- **Database:** Firebase Realtime Database
- **Design System:** Material Design 3 / Material Web Components

> ⚠️ Stack a ser decidida antes do início do desenvolvimento.

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
