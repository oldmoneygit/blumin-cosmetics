# Testes de Integração - Blumin Claude Code Setup

**Data:** 2025-11-01
**Status:** 🧪 Pronto para Testar

---

## 🎯 Testes Rápidos (5 minutos)

### Teste 1: Verificar Estrutura ✅

```bash
cd blumin
ls -la .claude/
```

**Esperado:**
```
.claude/
├── README.md
├── settings.json
├── hooks/
│   ├── skill-activation-prompt.ts
│   ├── skill-activation-prompt.sh
│   ├── post-tool-use-tracker.sh
│   └── tsconfig.json
└── skills/
    ├── skill-rules.json
    └── frontend-dev-guidelines/
```

---

### Teste 2: Verificar Dependências ✅

```bash
cd blumin
npm list tsx
```

**Esperado:**
```
blumin@1.0.0
└── tsx@x.x.x
```

---

### Teste 3: Testar Hook Manualmente 🧪

```bash
cd blumin

# Criar input de teste
echo '{"session_id":"test","transcript_path":"","cwd":"","permission_mode":"","prompt":"criar componente react"}' | npx tsx .claude/hooks/skill-activation-prompt.ts
```

**Esperado (Output JSON):**
```json
{
  "matched_skills": [
    {
      "name": "frontend-dev-guidelines",
      "matchType": "keyword",
      "priority": "high"
    }
  ],
  "suggestion": "💡 Skills relevantes detectadas..."
}
```

**Se der erro:** Verificar mensagem de erro e consultar Troubleshooting no README.md

---

### Teste 4: Keywords em Português 🇧🇷

```bash
echo '{"session_id":"test","transcript_path":"","cwd":"","permission_mode":"","prompt":"quero implementar uma nova funcionalidade"}' | npx tsx .claude/hooks/skill-activation-prompt.ts
```

**Esperado:** Deve matchear "implementar" e "funcionalidade"

---

### Teste 5: File Pattern Trigger 📁

**Ação Manual:**
1. Abrir Claude Code no projeto Blumin
2. Navegar para `blumin/components/ui/Button.tsx`
3. Fazer uma edição simples (adicionar comentário)
4. Perguntar ao Claude: "Como posso melhorar este componente?"

**Esperado:**
- Hook detecta que você está em arquivo `.tsx` em `components/`
- Skill `frontend-dev-guidelines` é automaticamente sugerida
- Claude menciona padrões React/Next.js

---

### Teste 6: Content Pattern Trigger 📝

**Ação Manual:**
1. Abrir arquivo que contenha `useState` ou `useEffect`
2. Perguntar: "O que faz este código?"

**Esperado:**
- Hook detecta `useState`/`useEffect` no conteúdo
- Skill é sugerida automaticamente

---

## 📊 Matriz de Testes

| # | Teste | Método | Status | Resultado |
|---|-------|--------|--------|-----------|
| 1 | Estrutura de arquivos | Manual | ⏳ | Pendente |
| 2 | Dependências instaladas | `npm list` | ⏳ | Pendente |
| 3 | Hook executa sem erro | Manual | ⏳ | Pendente |
| 4 | Keyword match (EN) | Manual | ⏳ | Pendente |
| 5 | Keyword match (PT) | Manual | ⏳ | Pendente |
| 6 | File pattern trigger | No Claude Code | ⏳ | Pendente |
| 7 | Content pattern trigger | No Claude Code | ⏳ | Pendente |

---

## 🔍 Debug: Se Algo Falhar

### Hook Não Executa

```bash
# Verificar permissões (Linux/Mac)
chmod +x .claude/hooks/*.sh
chmod +x .claude/hooks/*.ts

# Windows: permissões geralmente não são problema
```

### Erro "Cannot find module"

```bash
# Reinstalar dependências
cd blumin
npm install

# Verificar tsconfig
cat .claude/hooks/tsconfig.json
```

### JSON Parse Error

```bash
# Verificar se skill-rules.json é válido
cd blumin
cat .claude/skills/skill-rules.json | npx json-validate

# Ou usar jq (se instalado)
cat .claude/skills/skill-rules.json | jq .
```

### Timeout no Hook

```json
// Editar .claude/settings.json
{
  "hooks": {
    "UserPromptSubmit": {
      "timeout": 10000  // Aumentar de 5000 para 10000
    }
  }
}
```

---

## ✅ Critérios de Sucesso

Para considerar a integração bem-sucedida:

- [ ] Todos os arquivos copiados corretamente
- [ ] Hook executa sem erros (Teste 3)
- [ ] Keywords em inglês detectadas (Teste 4)
- [ ] Keywords em português detectadas (Teste 5)
- [ ] Skill sugere ao editar componente (Teste 6)
- [ ] Skill sugere ao ver código React (Teste 7)

**Mínimo para aprovar:** 4 de 6 testes passando

---

## 📝 Log de Testes

### Teste Executado Em: _____________

**Executor:** _____________

**Resultados:**

```
Teste 1 (Estrutura): ☐ Pass ☐ Fail
Teste 2 (Deps):      ☐ Pass ☐ Fail
Teste 3 (Hook):      ☐ Pass ☐ Fail
Teste 4 (Keywords):  ☐ Pass ☐ Fail
Teste 5 (PT):        ☐ Pass ☐ Fail
Teste 6 (File):      ☐ Pass ☐ Fail
Teste 7 (Content):   ☐ Pass ☐ Fail
```

**Notas:**
```
[Espaço para anotações sobre problemas encontrados]
```

**Ações Corretivas:**
```
[Espaço para documentar ajustes feitos]
```

---

## 🎓 Próximos Passos Após Testes

### Se Tudo Passou ✅

1. Começar a usar no desenvolvimento normal
2. Observar se suggestions aparecem naturalmente
3. Ajustar `skill-rules.json` se necessário
4. Considerar adicionar mais skills (backend quando pronto)

### Se Alguns Falharam ⚠️

1. Consultar seção de Debug acima
2. Verificar logs do Claude Code
3. Consultar [Troubleshooting no README](.claude/README.md#troubleshooting)
4. Ajustar configuração conforme necessário

### Se Muitos Falharam ❌

1. Revisar [BLUMIN_INTEGRATION_PLAN.md](../BLUMIN_INTEGRATION_PLAN.md)
2. Verificar se seguiu todos os passos da Fase 1 e 2
3. Comparar com configuração original do showcase
4. Considerar refazer setup do zero

---

## 📞 Suporte

**Documentação:**
- [Blumin README](.claude/README.md)
- [Integration Plan](../BLUMIN_INTEGRATION_PLAN.md)
- [Showcase README](../../README.md)

**Recursos Úteis:**
- Claude Code Docs: https://docs.claude.com/claude-code
- Showcase GitHub: (verificar se existe repositório público)

---

**Última Atualização:** 2025-11-01
**Versão:** 1.0
