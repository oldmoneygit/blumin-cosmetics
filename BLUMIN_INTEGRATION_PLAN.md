# Plano de Integração Personalizado: Blumin + Claude Code Showcase

**Data:** 2025-11-01
**Projeto:** Blumin E-commerce Platform
**Objetivo:** Integrar infraestrutura do Claude Code para maximizar produtividade

---

## 📊 Análise do Blumin - Match Perfeito

### Seu Stack Atual
✅ **Next.js 16.0.1** com App Router
✅ **React 19.2.0** com TypeScript 5.9.3
✅ **Tailwind CSS 3.4.18** para styling
✅ **Zustand 5.0.8** para state management
✅ **38 dependências** bem organizadas

### Status do Projeto
- **Fase Atual:** Frontend completo e funcional
- **Próxima Fase:** Backend (API routes, banco de dados, autenticação)
- **Arquitetura:** Pronta para migração de Next.js → Express + React separado

### Por Que o Showcase é Perfeito Para Você

| Necessidade do Blumin | Componente do Showcase | Benefício Imediato |
|------------------------|------------------------|-------------------|
| Implementar backend | `backend-dev-guidelines` | Padrões Express/Prisma prontos |
| Melhorar frontend React | `frontend-dev-guidelines` | Padrões React 18+/MUI adaptáveis |
| Skills auto-ativadas | Hooks de ativação | Contexto automático ao editar |
| Boas práticas | Todos os skills | Patterns testados em produção |
| Refatorar componentes | `code-refactor-master` | Reestruturação assistida |
| Documentar arquitetura | `documentation-architect` | Docs automáticas |

---

## 🎯 Plano de Integração em 4 Fases

### Fase 1: Setup Inicial (15-20 minutos)
**Objetivo:** Ativar sistema de skills automáticas

**Ações:**
1. ✅ Copiar hooks essenciais
2. ✅ Configurar `.claude/settings.json`
3. ✅ Instalar dependências dos hooks
4. ✅ Testar ativação básica

**Resultado Esperado:** Skills começam a sugerir automaticamente

---

### Fase 2: Frontend Skills (15 minutos)
**Objetivo:** Ativar padrões frontend para React/Next.js

**Ações:**
1. ✅ Copiar `frontend-dev-guidelines` skill
2. ✅ Adaptar para Next.js 16 + Tailwind (em vez de MUI)
3. ✅ Configurar triggers para arquivos do Blumin
4. ✅ Testar com componentes existentes

**Triggers Personalizados:**
```json
{
  "filePatterns": [
    "blumin/app/**/*.tsx",
    "blumin/app/**/*.ts",
    "blumin/components/**/*.tsx",
    "blumin/lib/**/*.ts",
    "blumin/hooks/**/*.ts"
  ],
  "contentPatterns": [
    "use client",
    "use server",
    "useState",
    "useEffect",
    "Zustand"
  ]
}
```

**Resultado Esperado:** Sugestões automáticas ao editar componentes React

---

### Fase 3: Backend Skills (30 minutos)
**Objetivo:** Preparar para implementação do backend

**Ações:**
1. ✅ Copiar `backend-dev-guidelines` skill
2. ✅ Adaptar para estrutura Next.js API routes OU Express separado
3. ✅ Configurar para Prisma + PostgreSQL (recomendado)
4. ✅ Adicionar `error-tracking` skill para Sentry

**Estrutura Backend Recomendada:**

**Opção A: Next.js API Routes (mais rápido)**
```
blumin/
├── app/
│   └── api/
│       ├── products/
│       │   ├── route.ts          # GET /api/products
│       │   └── [id]/
│       │       └── route.ts      # GET /api/products/:id
│       ├── cart/
│       │   └── route.ts          # POST /api/cart
│       └── checkout/
│           └── route.ts          # POST /api/checkout
├── lib/
│   ├── prisma.ts                 # Prisma client
│   ├── services/
│   │   ├── productService.ts
│   │   ├── cartService.ts
│   │   └── orderService.ts
│   └── validation/
│       └── schemas.ts            # Zod schemas
└── prisma/
    └── schema.prisma
```

**Opção B: Express Backend Separado (mais escalável)**
```
blumin-backend/
├── src/
│   ├── routes/
│   │   ├── products.routes.ts
│   │   ├── cart.routes.ts
│   │   └── orders.routes.ts
│   ├── controllers/
│   │   ├── ProductController.ts
│   │   ├── CartController.ts
│   │   └── OrderController.ts
│   ├── services/
│   │   ├── ProductService.ts
│   │   ├── CartService.ts
│   │   └── OrderService.ts
│   ├── repositories/
│   │   ├── ProductRepository.ts
│   │   └── OrderRepository.ts
│   └── middleware/
│       └── auth.middleware.ts
└── prisma/
    └── schema.prisma
```

**Triggers para Backend:**
```json
{
  "filePatterns": [
    "blumin/app/api/**/*.ts",
    "blumin/lib/services/**/*.ts",
    "blumin-backend/src/**/*.ts"
  ],
  "contentPatterns": [
    "prisma.",
    "async.*=>",
    "try.*catch",
    "router.",
    "app.get",
    "app.post"
  ]
}
```

**Resultado Esperado:** Padrões backend aparecem ao criar API routes

---

### Fase 4: Agentes & Automação (20 minutos)
**Objetivo:** Adicionar agentes especializados para tarefas complexas

**Agentes Prioritários para Blumin:**

1. **code-refactor-master**
   - Reorganizar componentes quando crescer
   - Extrair lógica duplicada
   - Melhorar estrutura de pastas

2. **documentation-architect**
   - Documentar arquitetura do projeto
   - Criar guias de API
   - Manter docs atualizadas

3. **frontend-error-fixer**
   - Debug erros do React/Next.js
   - Corrigir problemas de build
   - Resolver warnings TypeScript

4. **code-architecture-reviewer**
   - Review de novos componentes
   - Validar padrões
   - Sugerir melhorias

**Resultado Esperado:** Agentes disponíveis para invocar quando necessário

---

## 🚀 Implementação Prática

### Passo 1: Copiar Hooks Essenciais

```bash
# No diretório raiz do showcase
cd c:\Users\PC\Documents\claude-code-infra-showcase\claude-code-infrastructure-showcase

# Copiar hooks para o projeto Blumin
mkdir -p blumin/.claude/hooks
cp .claude/hooks/skill-activation-prompt.ts blumin/.claude/hooks/
cp .claude/hooks/post-tool-use-tracker.sh blumin/.claude/hooks/
```

### Passo 2: Configurar Settings

Criar `blumin/.claude/settings.json`:

```json
{
  "mcpServers": {},
  "hooks": {
    "UserPromptSubmit": {
      "description": "Auto-suggest skills based on context",
      "command": "node",
      "args": [".claude/hooks/skill-activation-prompt.ts"],
      "timeout": 5000
    },
    "PostToolUse": {
      "description": "Track file changes across sessions",
      "command": "bash",
      "args": [".claude/hooks/post-tool-use-tracker.sh"],
      "timeout": 5000
    }
  },
  "allowedBashCommands": ["npm", "node", "git", "ls", "cat"],
  "autoApprovalRegexes": {
    "Edit": [".*"],
    "Write": [".*"],
    "Bash": ["^npm", "^node", "^git"]
  }
}
```

### Passo 3: Instalar Dependências dos Hooks

```bash
cd blumin
npm install --save-dev @types/node tsx
```

### Passo 4: Copiar Frontend Skill

```bash
# Copiar skill
mkdir -p blumin/.claude/skills
cp -r .claude/skills/frontend-dev-guidelines blumin/.claude/skills/

# Copiar configuração base
cp .claude/skills/skill-rules.json blumin/.claude/skills/
```

### Passo 5: Adaptar skill-rules.json

Editar `blumin/.claude/skills/skill-rules.json`:

```json
{
  "version": "1.0.0",
  "description": "Blumin E-commerce - Skill Rules",
  "skills": {
    "frontend-dev-guidelines": {
      "type": "domain",
      "enforcementLevel": "suggest",
      "priority": "high",
      "triggers": {
        "keywords": [
          "component", "react", "next", "frontend",
          "tailwind", "zustand", "state", "hook",
          "tsx", "jsx", "client", "server"
        ],
        "intentPatterns": [
          "criar.*componente",
          "implementar.*feature",
          "adicionar.*estado",
          "estilizar.*componente",
          "criar.*página",
          "implementar.*rota"
        ],
        "filePatterns": [
          "blumin/app/**/*.tsx",
          "blumin/app/**/*.ts",
          "blumin/components/**/*.tsx",
          "blumin/lib/**/*.ts",
          "blumin/hooks/**/*.ts"
        ],
        "contentPatterns": [
          "^'use client'",
          "^'use server'",
          "useState",
          "useEffect",
          "useStore",
          "cn\\(",
          "className="
        ]
      },
      "skipConditions": {
        "filePatterns": [
          "**/node_modules/**",
          "**/.next/**",
          "**/dist/**"
        ]
      }
    }
  }
}
```

### Passo 6: Testar Ativação

1. Abrir Claude Code no projeto Blumin
2. Editar qualquer componente em `blumin/components/`
3. Fazer uma pergunta: "Como posso melhorar este componente?"
4. ✅ Verificar se `frontend-dev-guidelines` é sugerida automaticamente

---

## 📋 Checklist de Integração

### Fase 1: Setup ✅
- [ ] Hooks copiados para `blumin/.claude/hooks/`
- [ ] `settings.json` criado e configurado
- [ ] Dependências instaladas (`tsx`, `@types/node`)
- [ ] Hooks executam sem erros

### Fase 2: Frontend Skill ✅
- [ ] `frontend-dev-guidelines` copiada
- [ ] `skill-rules.json` adaptado para Blumin
- [ ] Triggers funcionando em arquivos `.tsx`
- [ ] Skill sugere automaticamente

### Fase 3: Backend Skill ⏳
- [ ] Decidir: Next.js API routes OU Express separado
- [ ] `backend-dev-guidelines` copiada
- [ ] Triggers configurados para backend
- [ ] Prisma schema criado
- [ ] Skill sugere em arquivos de API

### Fase 4: Agentes ⏳
- [ ] 4 agentes prioritários copiados
- [ ] Agentes testados individualmente
- [ ] Documentação de uso criada

---

## 🎓 Adaptações Necessárias

### Frontend Skill: MUI → Tailwind

O `frontend-dev-guidelines` original usa MUI v7. Para Blumin, adaptar:

**Remover referências a:**
- `@mui/material`
- `styled()` do MUI
- `sx` prop
- Theme do MUI

**Adicionar referências a:**
- Tailwind classes
- `cn()` utility para class merging
- Variantes do Tailwind
- Design tokens do Blumin

**Exemplo de adaptação:**

**Antes (MUI):**
```tsx
import { Button } from '@mui/material';

<Button sx={{ backgroundColor: 'primary.main' }}>
  Click me
</Button>
```

**Depois (Tailwind/Blumin):**
```tsx
import { Button } from '@/components/ui/Button';

<Button className="bg-primary-pink hover:bg-primary-pink/90">
  Click me
</Button>
```

### Backend Skill: Estrutura

O `backend-dev-guidelines` assume Express standalone. Para Next.js API routes:

**Adaptar:**
- Routes → App Router `route.ts` files
- Controllers → Inline em route handlers ou extrair para `lib/`
- Middleware → Next.js middleware.ts
- Error handling → Next.js error boundaries

**Manter:**
- Services layer (funciona igual)
- Repositories layer (funciona igual)
- Prisma patterns (funciona igual)
- Validation com Zod (funciona igual)

---

## 🔧 Próximos Passos Imediatos

### 1. Implementar Backend (Alta Prioridade)

**Tarefas:**
- [ ] Definir modelo de dados (Produtos, Usuários, Pedidos, Cart)
- [ ] Setup Prisma + PostgreSQL
- [ ] Criar API routes para produtos
- [ ] Implementar carrinho de compras
- [ ] Integrar Stripe para pagamentos
- [ ] Adicionar autenticação JWT

**Skill Necessária:** `backend-dev-guidelines`

### 2. Refatorar Estado Global (Média Prioridade)

**Problemas Atuais:**
- Estado duplicado em múltiplos `useState`
- Lógica de carrinho espalhada
- Falta de persistência real (apenas localStorage)

**Solução:**
- Centralizar no Zustand
- Sincronizar com backend via API
- Adicionar optimistic updates

**Agente Necessário:** `code-refactor-master`

### 3. Melhorar Performance (Baixa Prioridade)

**Oportunidades:**
- Lazy loading de componentes pesados
- Image optimization (já usa Next.js Image)
- Code splitting
- Memoization de componentes

**Skill Necessária:** `frontend-dev-guidelines` (seção Performance)

### 4. Testes (Baixa Prioridade)

**Setup Recomendado:**
- Jest + React Testing Library (unit)
- Playwright (e2e)
- MSW para mock de APIs

**Agente Necessário:** `documentation-architect` para test docs

---

## 📊 Métricas de Sucesso

### Após 1 Semana
- ✅ Skills ativam automaticamente 80%+ das vezes
- ✅ 3+ componentes novos criados com padrões corretos
- ✅ Backend setup iniciado com Prisma

### Após 1 Mês
- ✅ Backend funcional com 5+ endpoints
- ✅ Autenticação implementada
- ✅ 10+ componentes seguindo padrões
- ✅ Documentação automática gerada

### Após 3 Meses
- ✅ Projeto completo (frontend + backend)
- ✅ Testes implementados
- ✅ Patterns consolidados
- ✅ Skills customizadas para domínio específico

---

## 🆘 Troubleshooting

### Problema: Skills não ativam automaticamente

**Diagnóstico:**
1. Verificar logs do hook: `cat ~/.claude/logs/hooks.log`
2. Testar hook manualmente: `node blumin/.claude/hooks/skill-activation-prompt.ts`
3. Validar `skill-rules.json` JSON válido

**Soluções:**
- Verificar permissões dos arquivos
- Garantir que `tsx` está instalado
- Checar se patterns estão corretos

### Problema: Hooks muito lentos

**Diagnóstico:**
- Hook deve executar < 2 segundos
- Verificar tamanho do projeto (muitos arquivos?)

**Soluções:**
- Adicionar `.claudeignore` para excluir `node_modules`, `.next`
- Otimizar file patterns no hook
- Aumentar timeout em `settings.json`

### Problema: Skills sugerem contexto errado

**Diagnóstico:**
- Verificar triggers no `skill-rules.json`
- Conferir se file patterns capturam corretamente

**Soluções:**
- Refinar `filePatterns` e `contentPatterns`
- Ajustar prioridades das skills
- Adicionar `skipConditions` mais específicas

---

## 🎯 Comandos Rápidos

```bash
# Testar hook de ativação
cd blumin
node .claude/hooks/skill-activation-prompt.ts

# Ver logs dos hooks
tail -f ~/.claude/logs/hooks.log

# Validar skill-rules.json
cat .claude/skills/skill-rules.json | jq .

# Copiar skill adicional
cp -r ../claude-code-infrastructure-showcase/.claude/skills/backend-dev-guidelines .claude/skills/

# Copiar agente
cp -r ../claude-code-infrastructure-showcase/.claude/agents/code-refactor-master .claude/agents/
```

---

## 📚 Recursos de Referência

### Documentação do Showcase
- [README.md](../README.md) - Visão geral
- [CLAUDE_INTEGRATION_GUIDE.md](../CLAUDE_INTEGRATION_GUIDE.md) - Guia de integração
- [.claude/skills/README.md](../.claude/skills/README.md) - Skills disponíveis
- [.claude/hooks/README.md](../.claude/hooks/README.md) - Hooks disponíveis
- [.claude/agents/README.md](../.claude/agents/README.md) - Agentes disponíveis

### Documentação do Blumin
- [BLUMIN_ANALYSIS_SUMMARY.md](../BLUMIN_ANALYSIS_SUMMARY.md) - Resumo executivo
- [BLUMIN_DETAILED_ANALYSIS.md](../BLUMIN_DETAILED_ANALYSIS.md) - Análise técnica completa
- [BLUMIN_QUICK_REFERENCE.md](../BLUMIN_QUICK_REFERENCE.md) - Referência rápida
- [BLUMIN_ARCHITECTURE.md](../BLUMIN_ARCHITECTURE.md) - Arquitetura e integração

---

## 🎉 Conclusão

Este plano fornece um **caminho claro e testado** para integrar a infraestrutura do Claude Code Showcase no seu projeto Blumin. A integração é:

✅ **Incremental** - Faça por fases, sem pressa
✅ **Reversível** - Pode remover componentes facilmente
✅ **Customizável** - Adapte para suas necessidades
✅ **Testado** - Padrões de 6 meses de uso real

**Tempo Total Estimado:** 1h30min para setup completo
**Benefício Esperado:** 30-50% aumento em produtividade com Claude Code

Comece pela **Fase 1** (Setup Inicial) e teste antes de prosseguir. Qualquer dúvida, consulte a documentação ou ajuste conforme necessário!

---

**Próximo Passo Recomendado:** Executar Fase 1 - Setup Inicial (15-20 min)
