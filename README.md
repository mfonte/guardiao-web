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

> Stack a ser definida. Atualizar esta seção após decisão.

- Node.js 20+
- npm ou yarn
- Conta Firebase configurada

---

## Configuração

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/guardiao-web.git
cd guardiao-web
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite .env com as credenciais do Firebase
```

4. Execute em modo de desenvolvimento:
```bash
npm run dev
```

---

## Variáveis de Ambiente

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

## Scripts

```bash
npm run dev        # Desenvolvimento
npm run build      # Build de produção
npm run preview    # Preview do build
npm run lint       # Lint
npm run test       # Testes
```

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
