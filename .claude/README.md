# Claude Code Infrastructure - Blumin E-commerce

**Status:** ✅ Fase 1 e 2 Completas
**Data de Setup:** 2025-11-01
**Projeto:** Blumin E-commerce Platform (Next.js 16 + React 19 + TypeScript 5.9)

---

## 📋 O Que Foi Configurado

### ✅ Hooks Auto-Ativação (Fase 1)

**Hooks Instalados:**
1. **skill-activation-prompt** - Sugere skills baseado no contexto
2. **post-tool-use-tracker** - Rastreia mudanças em arquivos

**Como Funciona:**
- Quando você edita um arquivo `.tsx` em `app/` ou `components/`, o hook detecta
- Quando você usa palavras-chave como "component", "react", "next", o hook detecta
- Skills relevantes são automaticamente sugeridas ao Claude

**Configuração:** [settings.json](settings.json)

---

### ✅ Frontend Skill (Fase 2)

**Skill Instalada:** `frontend-dev-guidelines`

**Ativa Automaticamente Quando:**
- ✅ Você edita arquivos em `app/**/*.tsx`
- ✅ Você edita componentes em `components/**/*.tsx`
- ✅ Você menciona "component", "react", "next", "tailwind"
- ✅ Você usa código com `useState`, `useEffect`, `cn()`, `className=`
- ✅ Você pergunta sobre "criar componente", "implementar feature", etc.

**Padrões Incluídos:**
- React 18+ best practices
- Next.js 16 App Router patterns
- TypeScript type safety
- Component organization
- State management (adaptável para Zustand)
- Performance optimization
- Accessibility (a11y)

**Nota:** Skill original usa MUI v7, mas princípios são aplicáveis ao Tailwind

**Configuração:** [skills/skill-rules.json](skills/skill-rules.json)

---

## 🚀 Como Usar

### Uso Automático (Recomendado)

Simplesmente trabalhe normalmente! O sistema detecta automaticamente:

```tsx
// 1. Editar um componente existente
// blumin/components/ui/Button.tsx
// → Skill ativa automaticamente

// 2. Criar novo componente
// blumin/app/products/[id]/page.tsx
// → Skill sugere padrões

// 3. Perguntar ao Claude
"Como posso melhorar este componente?"
// → Skill é sugerida automaticamente
```

### Uso Manual (Quando Necessário)

Se a skill não ativar automaticamente, invoque manualmente:

```
Use o Skill tool com: frontend-dev-guidelines
```

---

## 📁 Estrutura Instalada

```
blumin/.claude/
├── README.md                          # Este arquivo
├── settings.json                      # Configuração de hooks
├── hooks/
│   ├── skill-activation-prompt.ts     # Hook de auto-ativação
│   ├── skill-activation-prompt.sh     # Wrapper bash
│   ├── post-tool-use-tracker.sh       # Hook de tracking
│   └── tsconfig.json                  # Config TypeScript para hooks
└── skills/
    ├── skill-rules.json               # Regras de ativação (customizado para Blumin)
    └── frontend-dev-guidelines/       # Skill de frontend
        ├── frontend-dev-guidelines.md # Conteúdo principal
        └── resources/                 # 10 arquivos de recursos detalhados
```

---

## 🎯 Gatilhos Configurados

### Keywords que Ativam a Skill

```
component, react component, UI, interface, page, modal,
dialog, form, frontend, React, Next.js, next, tailwind,
styling, layout, client component, server component,
zustand, state, hook, useEffect, useState
```

### Padrões de Intenção (Regex)

```
(criar|create|add|make|build|update|modify|edit).*?(component|UI|page|modal|dialog|form)
(como|how to|best practice).*?(component|react|next)
(estilizar|style|design|layout).*?(component|UI)
(implementar|implement|adicionar|add).*?(feature|funcionalidade|estado|state)
(refatorar|refactor|melhorar|improve).*?(component|código)
```

### Arquivos que Ativam

```
app/**/*.tsx          → Páginas Next.js
app/**/*.ts           → Utilitários Next.js
components/**/*.tsx   → Componentes React
lib/**/*.ts           → Bibliotecas/utils
hooks/**/*.ts         → Custom hooks
types/**/*.ts         → Definições TypeScript
```

### Conteúdo que Ativa

```
'use client'           → Client components
'use server'           → Server actions
useState               → State hooks
useEffect              → Effect hooks
useStore               → Zustand store
cn(                    → Class name utility
className=             → Tailwind classes
from 'next/            → Next.js imports
export default function → Component exports
framer-motion          → Animations
lucide-react           → Icons
```

---

## ⚙️ Customização

### Adicionar Mais Keywords

Edite [skills/skill-rules.json](skills/skill-rules.json):

```json
{
  "skills": {
    "frontend-dev-guidelines": {
      "promptTriggers": {
        "keywords": [
          "component",
          "seu-novo-keyword-aqui"
        ]
      }
    }
  }
}
```

### Adicionar Mais Path Patterns

```json
{
  "fileTriggers": {
    "pathPatterns": [
      "app/**/*.tsx",
      "seu-novo-pattern/**/*.tsx"
    ]
  }
}
```

### Mudar Enforcement Level

```json
{
  "enforcement": "suggest"    // Sugere (padrão)
  "enforcement": "block"      // Bloqueia até usar skill
  "enforcement": "warn"       // Avisa mas permite
}
```

---

## 🧪 Testar a Configuração

### Teste 1: Editar Componente Existente

```bash
# Abrir Claude Code no projeto Blumin
cd blumin

# Editar qualquer componente
# blumin/components/ui/Button.tsx
# Adicionar comentário ou fazer pequena mudança

# Perguntar ao Claude:
"Como posso melhorar este componente?"

# ✅ Esperado: Skill frontend-dev-guidelines é sugerida
```

### Teste 2: Criar Novo Componente

```bash
# Perguntar ao Claude:
"Crie um novo componente de Card para exibir produtos"

# ✅ Esperado: Skill é sugerida antes da criação
```

### Teste 3: Keyword Trigger

```bash
# Perguntar ao Claude:
"Qual a melhor prática para criar um component React?"

# ✅ Esperado: Keyword "component" e "React" ativam skill
```

### Teste 4: Hook Manual

```bash
# No terminal do projeto:
cd blumin
npx tsx .claude/hooks/skill-activation-prompt.ts

# Digite (stdin):
{"session_id":"test","transcript_path":"","cwd":"","permission_mode":"","prompt":"criar componente"}

# ✅ Esperado: JSON output com skill "frontend-dev-guidelines" matched
```

---

## 🔧 Troubleshooting

### Skill Não Ativa Automaticamente

**Problema:** Editei arquivo `.tsx` mas skill não foi sugerida

**Diagnóstico:**
1. Verificar se arquivo está nos path patterns
2. Verificar se `tsx` está instalado: `npm list tsx`
3. Testar hook manualmente (ver Teste 4 acima)

**Solução:**
```bash
# Reinstalar tsx se necessário
npm install --save-dev tsx

# Verificar paths no skill-rules.json
cat .claude/skills/skill-rules.json | grep "pathPatterns" -A 10
```

### Hook Timeout

**Problema:** Hook demora muito (> 5s)

**Solução:**
```json
// settings.json
{
  "hooks": {
    "UserPromptSubmit": {
      "timeout": 10000  // Aumentar para 10s
    }
  }
}
```

### Skill Ativa Demais

**Problema:** Skill sugere em todo contexto, irritante

**Solução 1 - Reduzir prioridade:**
```json
// skill-rules.json
{
  "priority": "medium"  // Era "high"
}
```

**Solução 2 - Mudar para enforcement "warn":**
```json
{
  "enforcement": "warn"  // Era "suggest"
}
```

**Solução 3 - Adicionar skip condition:**
```tsx
// No topo do arquivo
// @skip-validation
```

---

## 📚 Próximos Passos

### Fase 3: Backend Skills (Quando Implementar API)

Quando começar o backend, adicione:

```bash
# Do diretório raiz do showcase
cp -r .claude/skills/backend-dev-guidelines blumin/.claude/skills/

# Editar blumin/.claude/skills/skill-rules.json
# Adicionar configuração backend (ver BLUMIN_INTEGRATION_PLAN.md)
```

**Skills Recomendadas para Backend:**
- `backend-dev-guidelines` - Padrões Express/Prisma
- `error-tracking` - Integração Sentry
- `route-tester` - Testar endpoints autenticados

### Fase 4: Agentes Especializados

Copiar agentes conforme necessidade:

```bash
# Agentes recomendados para Blumin
cp -r ../claude-code-infrastructure-showcase/.claude/agents/code-refactor-master blumin/.claude/agents/
cp -r ../claude-code-infrastructure-showcase/.claude/agents/documentation-architect blumin/.claude/agents/
cp -r ../claude-code-infrastructure-showcase/.claude/agents/frontend-error-fixer blumin/.claude/agents/
```

**Quando usar cada agente:**
- `code-refactor-master` - Quando precisar reorganizar componentes
- `documentation-architect` - Quando precisar gerar documentação
- `frontend-error-fixer` - Quando tiver erros no React/Next.js
- `code-architecture-reviewer` - Review de arquitetura antes de PR

---

## 📖 Documentação Adicional

### Showcase Original
- [Guia de Integração](../../CLAUDE_INTEGRATION_GUIDE.md)
- [README Principal](../../README.md)
- [Skills Disponíveis](../../.claude/skills/README.md)
- [Hooks Disponíveis](../../.claude/hooks/README.md)
- [Agentes Disponíveis](../../.claude/agents/README.md)

### Documentação Blumin
- [Plano de Integração](../../BLUMIN_INTEGRATION_PLAN.md)
- [Análise do Projeto](../../BLUMIN_ANALYSIS_SUMMARY.md)
- [Arquitetura](../../BLUMIN_ARCHITECTURE.md)
- [Quick Reference](../../BLUMIN_QUICK_REFERENCE.md)

---

## ✅ Checklist de Setup

- [x] Diretório `.claude/` criado
- [x] Hooks copiados e configurados
- [x] `settings.json` criado
- [x] Dependência `tsx` instalada
- [x] Skill `frontend-dev-guidelines` copiada
- [x] `skill-rules.json` customizado para Blumin
- [x] Documentação criada
- [ ] Testado com componente real
- [ ] Testado com pergunta ao Claude
- [ ] Ajustado conforme necessidade

---

## 🎉 Status

**Configuração:** ✅ Completa
**Testado:** ⏳ Pendente (execute os testes acima)
**Próximo Passo:** Testar skill activation com componente real

---

**Última Atualização:** 2025-11-01
**Versão:** 1.0
**Setup Por:** Claude Code (Anthropic)
