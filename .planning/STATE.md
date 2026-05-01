# State — Guardião Web

> Memória do projeto. Atualizado a cada fase concluída.

---

## Status Atual

- **Milestone:** v1.0.0 — Dashboard inicial
- **Fase ativa:** —
- **Última fase concluída:** Inicialização GSD (questionário, requisitos, roadmap)
- **Próximo passo:** `/gsd-plan-phase 1` — planejar Fase 1 (Scaffold & Auth)

---

## Decisões-Chave Registradas

| Data       | Decisão                                                     | Justificativa                                                                |
| ---------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 2026-05-01 | Stack: Vite + React + JSX (não TS)                          | Fidelidade ao protótipo aprovado; TS fica como milestone futura              |
| 2026-05-01 | Localização do app: subpasta `dashboard/` no `guardiao-web` | Não tocar na landing `index.html` da raiz, deploys independentes             |
| 2026-05-01 | URL: `guardiaoiot.com.br/dashboard`                         | Mesma origem da landing, sem subdomínio novo                                 |
| 2026-05-01 | Backend reaproveitado do `guardiao-app`                     | Mesmo projeto Firebase `iotemp-sensor`, mesmas rules, mesmas Cloud Functions |
| 2026-05-01 | Granularidade: coarse (4 fases)                             | Alinha com as 3 entregas já validadas em chat + 1 fase de deploy             |
| 2026-05-01 | Modo: YOLO + auto-advance                                   | Usuário trabalhando do celular, prefere fluxo contínuo                       |
| 2026-05-01 | Auth: só email/senha na v1                                  | Simplicidade; Google/Apple sign-in fica para v2                              |
| 2026-05-01 | Devices unificados: pessoais + de org                       | Usuário admin vê devices da org dele e quaisquer pessoais que tenha          |
| 2026-05-01 | Convite por email via Cloud Function existente (Resend)     | Não duplicar lógica que já está no `guardiao-app/functions`                  |

---

## Contexto Externo Importante

- **Protótipo aprovado** (referência visual): `~/Downloads/guardiao-web-sugestao.jsx` — Entrega 2 já validada visualmente.
- **Backend de verdade**: `../guardiao-app` — fonte única de Firebase config, database rules e Cloud Functions.
- **PRD**: `../Guardiao_PRD_v1.1.docx` — visão geral da plataforma.
- **CLAUDE.md raiz**: `../CLAUDE.md` — padrões compartilhados entre repos.

---

## Histórico de Fases

_(vazio — primeira fase ainda não iniciada)_
