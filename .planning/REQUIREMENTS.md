# Requirements — Guardião Web Dashboard v1

> Escopo congelado para a primeira versão do dashboard. Tudo aqui DEVE estar implementado e validado antes do milestone v1 ser marcado como completo.

---

## R1 — Estrutura do Projeto

- **R1.1** O projeto Vite reside em `dashboard/` na raiz do repo, **sem** afetar `index.html` (landing) na raiz.
- **R1.2** Build de produção sai em `dashboard/dist/` e pode ser servido como SPA estática.
- **R1.3** Variáveis de ambiente Firebase ficam em `dashboard/.env` (gitignored), com `dashboard/.env.example` versionado.
- **R1.4** Lint (ESLint) configurado e passando em todo o código novo.
- **R1.5** Scripts npm padrão: `dev`, `build`, `preview`, `lint`.

---

## R2 — Autenticação

- **R2.1** Tela de login com email + senha, validação de campos vazios.
- **R2.2** Mensagem de erro clara para credenciais inválidas (não vazar se foi email ou senha que falhou).
- **R2.3** Toggle de exibir/ocultar senha.
- **R2.4** Estado de loading durante autenticação.
- **R2.5** Fluxo "Esqueci minha senha" usando `sendPasswordResetEmail` do Firebase.
- **R2.6** Sessão persistente entre reloads (`browserLocalPersistence`).
- **R2.7** Logout funcional, limpa estado e volta para tela de login.
- **R2.8** Guard de rota: usuário não autenticado nunca vê telas internas.
- **R2.9** Após login, sistema lê `UsersData/{uid}/userData` em tempo real (listener) e disponibiliza para toda a app.
- **R2.10** Se o usuário tem `userData.orgId`, sistema também lê `orgs/{orgId}/metadata` e `orgs/{orgId}/members/{uid}` em tempo real para descobrir o role efetivo na org.

---

## R3 — Layout & Navegação

- **R3.1** Header fixo no topo com: logo Guardião, nome da org (se houver), avatar com iniciais do user, toggle de push global, botão de logout.
- **R3.2** Sidebar com navegação no desktop (≥1024px). Drawer com overlay no mobile (<1024px), aberto via botão hambúrguer.
- **R3.3** Itens de nav: Visão geral, Dispositivos, Organização (admin), Membros (admin), Configurações.
- **R3.4** Itens "Organização" e "Membros" só aparecem se o user é `company_admin` na org atual.
- **R3.5** Layout responsivo: legível e usável de 360px (celular) até 1440px+ (desktop).
- **R3.6** Dark mode aplicado por padrão (paleta zinc/emerald do protótipo aprovado).
- **R3.7** Acessibilidade: foco visível em todos os interativos, contraste AA mínimo, labels nas inputs.

---

## R4 — Visão Geral (Home)

- **R4.1** Quatro KPIs no topo: Total / Online / Offline / Em alerta.
- **R4.2** Lista de "Alertas ativos" com cada device fora da faixa, clicável para abrir o detalhe do device. Distinguir visualmente acima vs abaixo do limite.
- **R4.3** Lista de "Sem comunicação" (offline) com tempo desde última leitura.
- **R4.4** Empty state quando tudo OK (mensagem positiva, não alerta vazio).
- **R4.5** CTA "Ver todos os N dispositivos" leva para a página Dispositivos.

---

## R5 — Lista & Detalhe de Dispositivos

- **R5.1** Lista mostra todos os devices visíveis ao user (do próprio `UsersData/{uid}/devices` **e** de `orgs/{orgId}/devices` se membro de org).
- **R5.2** Cada card de device exibe: nome, ID, temperatura atual, status (Normal / Alerta / Offline), faixa configurada, tempo desde última leitura.
- **R5.3** Busca local por nome ou ID.
- **R5.4** Em mobile, selecionar device ocupa a tela inteira; em desktop, layout side-by-side (lista + detalhe).
- **R5.5** Detalhe mostra: temperatura grande com 2 casas decimais, timestamp, mín/méd/máx das últimas 48h, gráfico recharts com linha de leitura + linhas tracejadas de threshold.
- **R5.6** Painéis de Hardware (firmware, UUID, heap, tipo) e Conectividade (Wi-Fi RSSI, intervalo de envio, push, modo de threshold).
- **R5.7** Histórico vem de `UsersData/{uid}/devices/{deviceId}/datalogger/{ts}` ou equivalente em `orgs/{orgId}/...`, ordenado por timestamp, limitado a janela de 48h por padrão.
- **R5.8** Botão "Configurar" leva para a tela de edição (R6).

---

## R6 — Edição de Configuração de Device

- **R6.1** Editar `displayName` (≤20 chars conforme `database.rules.json`).
- **R6.2** Editar `_threshold.higherTemp`, `_threshold.lowerTemp`, `_threshold.thresholdMode` (`lower` | `higher` | `both`).
- **R6.3** Editar `sendIntervalMinutes` (1 a 240).
- **R6.4** Toggle `notifications.enabled` per-device.
- **R6.5** Validação: mínimo deve ser estritamente menor que máximo; intervalo ≥1.
- **R6.6** Barra "salvar" sticky aparece quando há alterações; botão desabilita se inválido.
- **R6.7** Save escreve via `update()` no path correto (`UsersData/{uid}/devices/{id}/config` ou `orgs/{orgId}/devices/{id}/config`).
- **R6.8** Confirmação visual após salvar; alterações refletem imediatamente nas outras telas (graças ao listener).
- **R6.9** Toggle global de push (sininho do header) escreve em `alertPreferences/pushEnabled`.

---

## R7 — Organização (admin only)

- **R7.1** Tela "Organização" mostra dados da org: nome, data de criação, total de membros, total de devices.
- **R7.2** Edição do nome da org (≤100 chars conforme rules), só `company_admin`.

---

## R8 — Membros (admin only)

- **R8.1** Lista de membros de `orgs/{orgId}/members/` com nome, email, role, data de entrada.
- **R8.2** Indicação visual do próprio user na lista.
- **R8.3** Convidar novo membro: form com email + role; gera token e escreve em `orgs/{orgId}/invites/{token}` (Cloud Function existente cuida do envio do email via Resend).
- **R8.4** Listar convites pendentes; permitir cancelar (delete do nó).
- **R8.5** Remover membro (delete `orgs/{orgId}/members/{uid}`); admin não pode se auto-remover.
- **R8.6** Alterar role de membro entre `company_admin` | `member` | `viewer`.

---

## R9 — Configurações Pessoais

- **R9.1** Editar `userData.name` e `userData.company` do próprio user.
- **R9.2** Toggle global `alertPreferences.pushEnabled`.
- **R9.3** Trocar senha via `updatePassword` (com reautenticação se necessário).
- **R9.4** Exibir email (read-only) e role na org.

---

## R10 — Deploy

- **R10.1** `firebase.json` na raiz do `guardiao-web` com **dois targets** Hosting:
  - `landing` → serve `index.html` da raiz, ignora `dashboard/**`.
  - `dashboard` → serve `dashboard/dist/`, com rewrite `/dashboard/**` → `/index.html` para roteamento SPA.
- **R10.2** `.firebaserc` configura targets pro projeto `iotemp-sensor`.
- **R10.3** README com instruções de build + deploy (`npm --prefix dashboard run build && firebase deploy --only hosting:dashboard`).
- **R10.4** Dashboard acessível em `https://guardiaoiot.com.br/dashboard` em produção.
- **R10.5** Landing continua funcionando intacta após primeiro deploy do dashboard.

---

## R11 — Segurança

- **R11.1** Nenhum secret commitado. `.env` no gitignore. Apenas `.env.example` versionado.
- **R11.2** Todas as escritas no Realtime DB usam paths que respeitam `database.rules.json` existente (sem tentar contornar regras client-side).
- **R11.3** Confirmação destrutiva (modal/dialog) antes de remover membro ou cancelar convite.
- **R11.4** Token de convite gerado com `crypto.randomUUID()` ou equivalente seguro, nunca um valor previsível.

---

## Não-Requisitos (explicitamente fora desta v1)

- Telas para `platform_admin` (Super Admin de plataforma).
- Cadastro self-service (sign-up sem convite).
- Migração para TypeScript.
- Testes E2E (Playwright/Cypress).
- PWA / service worker / instalação offline.
- Internacionalização (pt-BR fixo).
- Exportar dados (CSV/PDF) — fica para v2.
- Histerese, calibração de offset, modo manutenção em devices.
- Notificações in-app além do toggle global existente.
