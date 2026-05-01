# Roadmap — Guardião Web Dashboard v1

> Granularidade: **coarse** (4 fases). Modo de execução: **YOLO + auto-advance**. Cada fase termina com commit atômico e validação contra requirements antes de avançar.

---

## Fase 1 — Scaffold & Auth

**Goal:** Projeto Vite criado em `dashboard/`, tela de login Firebase funcionando, layout autenticado com nav role-based, dados do user/org fluindo via listeners reais. Landing intacta.

**Cobre:** R1.1–R1.5, R2.1–R2.10, R3.1–R3.7, R11.1.

**Entregáveis:**
- `dashboard/` com Vite + React + Tailwind v4 + lucide-react + recharts + firebase instalados.
- `src/core/firebase.js` configurado para projeto `iotemp-sensor` lendo `import.meta.env.VITE_FIREBASE_*`.
- `dashboard/.env.example` versionado; `dashboard/.env` no gitignore.
- Tela `LoginScreen` portada do protótipo, **plugada no Firebase Auth real**.
- Recuperação de senha via `sendPasswordResetEmail`.
- Hook `useAuth()` exportando `user`, `userData`, `org`, `signIn`, `signOut`, `sendPasswordReset`.
- Listener em `UsersData/{uid}/userData` e (se `orgId`) em `orgs/{orgId}/metadata` + `orgs/{orgId}/members/{uid}`.
- Shell autenticado (header + sidebar/drawer), nav role-based.
- Páginas internas inicialmente como placeholders ("em construção"), exceto a navegação em si que precisa funcionar.
- `.gitignore` raiz atualizado para ignorar `dashboard/node_modules`, `dashboard/dist`, `dashboard/.env`.

**UAT (validação manual mobile + desktop):**
- Login com credencial real do `iotemp-sensor` funciona.
- Reload mantém sessão.
- Logout volta para login.
- Drawer abre/fecha no mobile.
- "Organização"/"Membros" só aparece se user é `company_admin`.
- `index.html` da raiz continua acessível sem alterações.

**Depends on:** —

---

## Fase 2 — Visão Geral, Devices & Edição

**Goal:** Visão geral com KPIs e alertas acionáveis, lista de devices com busca, detalhe com gráfico real do `datalogger`, edição de configuração persistindo no Realtime DB, unificando devices pessoais (`UsersData/.../devices`) e de org (`orgs/.../devices`).

**Cobre:** R4, R5, R6, R9.2 (toggle global push).

**Entregáveis:**
- Hook `useDevices()` que combina `UsersData/{uid}/devices` + `orgs/{orgId}/devices`, expondo cada item com sua origem (`source: 'user' | 'org'`) para escolher o path correto na hora de escrever.
- Página `Home` (visão geral) portada do protótipo, alimentada pelo hook real.
- Página `DevicesPage` com lista, busca, drill-down em mobile.
- Componente `DeviceDetail` com gráfico recharts plotando histórico real lido de `datalogger/{ts}` (janela 48h, ordenado).
- Página `EditDevicePage` que escreve via `update()` no path coreto conforme `source`.
- Validação de threshold (mín < máx) e intervalo (1–240).
- Toggle global de push no header escrevendo em `alertPreferences/pushEnabled`.
- Estado de loading/empty para devices.
- Tratamento de `permission_denied` (mostra mensagem amigável, não quebra a UI).

**UAT:**
- KPIs batem com a contagem real do DB.
- Clicar em alerta na home abre o device correto.
- Edição de threshold persiste e reflete imediatamente em todas as telas.
- Gráfico mostra dados históricos reais (não synthetic).
- Mín > Máx é bloqueado com mensagem.
- Funciona pra device pessoal **e** pra device de org.

**Depends on:** Fase 1.

---

## Fase 3 — Organização, Membros & Configurações Pessoais

**Goal:** Admin de empresa gerencia membros (listar, convidar via email, alterar role, remover) e dados básicos da org; qualquer user edita seu perfil pessoal e troca senha.

**Cobre:** R7, R8, R9 (todo).

**Entregáveis:**
- Página `OrgPage`: ler/editar `orgs/{orgId}/metadata.name`, mostrar contadores (membros, devices).
- Página `MembersPage`:
  - Lista de `orgs/{orgId}/members/` com role e ações.
  - Form de convite que escreve em `orgs/{orgId}/invites/{inviteId}` com token gerado por `crypto.randomUUID()`. Cloud Function existente cuida do email via Resend — front só dispara o write.
  - Lista de convites pendentes com cancelar.
  - Modal de confirmação para remoção de membro.
  - Bloquear admin de remover a si mesmo ou alterar próprio role.
  - Edição de role inline.
- Página `SettingsPage`:
  - Form pra `userData.name`, `userData.company`.
  - Trocar senha (`updatePassword` + reautenticação se Firebase exigir).
  - Toggle global de push (mesma fonte do header).

**UAT:**
- Admin convida membro real, recebe email (Cloud Function dispara).
- Convite pendente aparece e pode ser cancelado.
- Alterar role atualiza visibilidade de menu pro membro afetado em tempo real.
- Remover membro pede confirmação e funciona.
- Trocar senha funciona; reautenticação aparece se sessão antiga.
- Membro não-admin **não** consegue acessar `MembersPage` mesmo via URL direta.

**Depends on:** Fase 2 (precisa do hook `useDevices()` para contar devices da org).

---

## Fase 4 — Deploy e Polimento Final

**Goal:** Dashboard servido em `guardiaoiot.com.br/dashboard` via Firebase Hosting, sem afetar a landing existente. README claro sobre como buildar e deployar.

**Cobre:** R10, R11 (auditoria final).

**Entregáveis:**
- `firebase.json` na raiz do `guardiao-web` com dois targets (`landing` e `dashboard`):
  - `landing`: serve raiz; ignora `dashboard/**`, `.planning/**`, `node_modules/**`.
  - `dashboard`: public `dashboard/dist`; rewrite `/**` → `/index.html`.
- `.firebaserc` com `targets.iotemp-sensor.hosting.landing` e `.dashboard` apontando para os Hosting sites corretos no Firebase (criar site `dashboard` se não existir, documentando o passo).
- `vite.config.js` configurado com `base: '/dashboard/'` para asset paths corretos em produção.
- README atualizado com:
  - Como rodar local (`cd dashboard && npm install && npm run dev`).
  - Como buildar (`npm --prefix dashboard run build`).
  - Como deployar (`firebase deploy --only hosting:dashboard`).
  - Como obter `.env` (referência às chaves do `iotemp-sensor`).
- Auditoria de segurança rápida: revisar que nenhum secret vazou, que todas as escritas obedecem rules.
- Smoke test em produção: login, ver devices, editar config, ver landing intacta.
- `CHANGELOG.md` atualizado com entrada `[v1.0.0]`.

**UAT:**
- `https://guardiaoiot.com.br/dashboard` carrega a SPA, sem 404 em refresh de rotas internas.
- `https://guardiaoiot.com.br/` continua mostrando a landing original.
- Login real funciona em produção.
- Lighthouse: contraste OK, sem erros de console críticos.

**Depends on:** Fase 3.

---

## Backlog (não escopado para v1)

- Telas para `platform_admin` (Super Admin).
- Sign-up self-service.
- Migração JSX → TSX.
- Testes E2E (Playwright).
- PWA / instalação offline.
- i18n.
- Exportar histórico em CSV.
- Customizações avançadas de device (histerese, offset, modo manutenção).
