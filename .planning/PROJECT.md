# Guardião Web — Dashboard

> Painel web para assinantes da plataforma **Guardião IoT**, integrado ao mesmo backend Firebase usado pelo app mobile (Flutter).

---

## Visão

Hoje o Guardião IoT entrega monitoramento de temperatura via **app mobile** (iOS/Android) e tem uma **landing page institucional** em `www.guardiaoiot.com.br`. Falta a peça do meio: um **dashboard web** para que assinantes — especialmente administradores de empresa — possam acompanhar e gerenciar dispositivos, equipes e alertas confortavelmente do desktop.

Este repositório (`guardiao-web`) abriga:

- A **landing page** já no ar (`index.html` na raiz), que **não é alterada por este projeto**.
- O novo **dashboard SPA** (subpasta `dashboard/`), que será servido em `guardiaoiot.com.br/dashboard`.

---

## Princípios

- **Reaproveitar backend existente.** Mesmo projeto Firebase (`iotemp-sensor`), mesmas regras (`database.rules.json` no `guardiao-app`), mesmas Cloud Functions (push, email de convite via Resend). Web é só mais um cliente.
- **Não tocar na landing.** A `index.html` raiz fica intacta. Deploy do dashboard é independente.
- **Mobile-first responsivo.** Muitos admins vão acessar do celular antes de estar no desktop. Layout funciona dos 360px até wide screens.
- **Multi-tenant desde o dia 1.** A estrutura de dados já distingue `UsersData/{uid}` (devices pessoais) de `orgs/{orgId}/...` (devices e membros de empresa). O dashboard precisa enxergar ambos.
- **Dark mode nativo.** Padrão `CLAUDE.md` do projeto. Paleta verde-esmeralda definida no protótipo aprovado.
- **Validação visual antes de plumbing.** Protótipo com mock data foi aprovado em chat antes deste projeto começar — agora é portar pra Vite e plugar Firebase.

---

## Stack

| Camada | Escolha | Por quê |
|---|---|---|
| Build | **Vite** | Bundle leve, HMR rápido, output estático que casa com Firebase Hosting |
| UI | **React 18 + JSX** | Mesma stack do protótipo aprovado; TypeScript fica para milestone futura |
| Estilo | **Tailwind v4** | Utility-first, dark mode trivial, alinha com Material Design 3 sem framework pesado |
| Ícones | **lucide-react** | Já usado no protótipo |
| Gráficos | **recharts** | Mais leve que alternativas, suficiente pro escopo (linha + threshold) |
| Auth | **Firebase Auth** (email/senha) | Já habilitado no projeto Firebase via app mobile |
| Dados | **Firebase Realtime Database** | Mesmo DB do app mobile (`iotemp-sensor-default-rtdb`) |
| Push | **FCM web** (Entrega 3+) | Cloud Functions de push já existem no `guardiao-app/functions` |
| Hospedagem | **Firebase Hosting** | Mesmo projeto que serve a landing; dois targets (`landing`, `dashboard`) |

> **Decisão registrada:** o `CLAUDE.md` do repo lista TypeScript como preferido. Optamos por **JSX neste milestone** para preservar o protótipo já validado e acelerar v1; conversão para TS fica como milestone explícita futura.

---

## Estrutura do Repositório

```
guardiao-web/
├── index.html              ← landing (NÃO MEXER — está no ar)
├── dashboard/              ← novo Vite SPA
│   ├── src/
│   │   ├── core/           ← firebase config, theme, helpers
│   │   ├── features/       ← auth, devices, dashboard, org, members, settings
│   │   ├── shared/         ← componentes, hooks
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── firebase.json           ← criado na fase de deploy (rewrite /dashboard/**)
├── .firebaserc
└── .planning/              ← este diretório (GSD)
```

---

## Backend de Referência (já existente)

Tudo abaixo já existe no repo `../guardiao-app` — o dashboard apenas consome.

### Projeto Firebase
- **Project ID:** `iotemp-sensor`
- **Auth domain:** `iotemp-sensor.firebaseapp.com`
- **Database URL:** `https://iotemp-sensor-default-rtdb.firebaseio.com`
- **Storage:** `iotemp-sensor.appspot.com`
- **Web app ID disponível:** `1:871290432132:web:fffa503232619be16430d1` (segundo web app já registrado, separado do que serve a landing)

### Modelo de Dados (Realtime DB)

```
UsersData/{uid}/
  userData: { name, email, company, orgId?, userType }
  alertPreferences: { pushEnabled }
  fcmTokens/{tokenPrefix}: { token, platform, createdAt, lastSeen }
  devices/{deviceId}/
    data: { displayName, temperature, deviceStatus, timestamp }
    config: { _threshold: { higherTemp, lowerTemp, thresholdMode }, deviceType, sendIntervalMinutes, notifications: { enabled } }
    boot: { fw, heap, wifi, uuid, ... }
    datalogger/{ts}: { temperature, timestamp }

orgs/{orgId}/
  metadata: { name, createdAtEpoch, createdBy }
  members/{uid}: { name, email, role, joinedAtEpoch }   // role ∈ company_admin | member | viewer
  invites/{inviteId}: { email, role, token, ... }
  devices/{deviceId}/...                                  // mesma forma de UsersData/devices
```

### Roles
- `platform_admin` → vê tudo (raiz `orgs`). Não escopo desta v1.
- `company_admin` → CRUD em `orgs/{orgId}/metadata|members|invites|devices`.
- `member` / `viewer` → leitura nos devices da org da qual é membro.

### Cloud Functions já implementadas (`guardiao-app/functions`)
- Push via FCM em mudança de threshold (respeita `alertPreferences/pushEnabled` global e `notifications/enabled` per-device).
- Convite por email via **Resend** (escreve em `orgs/{orgId}/invites/`).

---

## Validação Pré-GSD

Já aprovado em conversa antes deste projeto:

- ✅ **Entrega 1** (Auth + layout autenticado): tela login, recuperar senha, drawer mobile, role-based nav.
- ✅ **Entrega 2** (Dashboard + Devices): visão geral com KPIs e alertas acionáveis, lista com busca, detalhe com gráfico 48h, edição de threshold/intervalo/push com validação.
- ⏭️ **Entrega 3** (Organização): membros, convites, roles, transferência de devices.
- ⏭️ **Deploy**: `firebase.json` com rewrite `/dashboard/**` → SPA.

Protótipo de referência: `../downloads/guardiao-web-sugestao.jsx` (Entrega 2 aprovada, ~700 linhas, mock data com a estrutura exata acima).

---

## Não-Objetivos desta v1

- Telas para `platform_admin` (Super Admin de plataforma) — fica para milestone futura.
- Onboarding/cadastro self-service — convite via admin de org cobre v1.
- TypeScript — milestone futura.
- Testes E2E — só unit/component nesta v1.
- PWA / instalação offline — milestone futura.
- i18n — pt-BR fixo.
