---
title: "BOLA / IDOR: Como encontrar a vulnerabilidade mais crítica em APIs"
category: "AppSec"
date: "Jan 2025"
image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80"
---

# Entendendo BOLA (Broken Object Level Authorization)

O OWASP API Security Top 10 lista o **BOLA** (também conhecido tradicionalmente como **IDOR** - Insecure Direct Object Reference) como a vulnerabilidade número 1 em APIs. 

Apesar de ser conceitualmente simples, ela continua sendo uma das falhas mais encontradas em programas de Bug Bounty e Pentests, resultando frequentemente em vazamento de dados sensíveis (PII) e account takeover.

## O que é BOLA?

A vulnerabilidade ocorre quando uma aplicação não verifica corretamente se o usuário que está fazendo a requisição tem permissão para acessar o objeto específico (registro no banco de dados) que ele está solicitando.

### Exemplo Prático

Imagine uma API de um banco digital. Quando você acessa o seu extrato, a requisição se parece com isto:

```http
GET /api/v1/accounts/8492/transactions HTTP/1.1
Host: api.banco.com
Authorization: Bearer eyJhbGciOiJIUzI1...
```

A aplicação verifica se o Token JWT é válido. Sim, você é um usuário autenticado. Mas o que acontece se você mudar o número da conta de `8492` para `8493`?

```http
GET /api/v1/accounts/8493/transactions HTTP/1.1
Host: api.banco.com
Authorization: Bearer eyJhbGciOiJIUzI1...
```

Se a API retornar as transações da conta `8493`, parabéns: você encontrou um BOLA. O backend verificou **quem** você é (Autenticação), mas falhou em verificar se você **tem o direito** de ver aquele recurso específico (Autorização de Nível de Objeto).

## Como encontrar BOLA na prática

Encontrar BOLAs triviais (como trocar IDs numéricos visíveis) está ficando mais difícil, pois a maioria dos frameworks modernos usa UUIDs/GUIDs (ex: `123e4567-e89b-12d3-a456-426614174000`), que são impossíveis de adivinhar.

Aqui estão algumas técnicas para encontrar BOLA avançado:

### 1. Vazamento de UUIDs

Mesmo que a API use UUIDs no endpoint principal, outras rotas da API podem vazar os UUIDs de outros usuários. 
- Procure em respostas de fóruns, comentários, rotas de pesquisa de usuários, etc.
- Se você conseguir o UUID do alvo, jogue-o no endpoint vulnerável.

### 2. HPP (HTTP Parameter Pollution) para BOLA

Às vezes, a API aceita múltiplos IDs ou injeta parâmetros que sobrescrevem a lógica de autorização.

```http
# Tentativa 1: Bloqueado (403 Forbidden)
GET /api/profile?user_id=ALVO

# Tentativa 2: Bypass através de array (200 OK)
GET /api/profile?user_id[]=MEU_ID&user_id[]=ALVO

# Tentativa 3: Bypass de poluição (200 OK)
GET /api/profile?user_id=MEU_ID&user_id=ALVO
```

### 3. Alteração do Método HTTP

Desenvolvedores às vezes aplicam verificações de autorização apenas no método `GET`. Tente usar outros métodos para contornar a regra:
- Mude `GET` para `POST` com body vazio.
- Mude `GET` para `PUT` ou `PATCH` enviando um JSON com dados triviais.

## Como os desenvolvedores devem corrigir?

A mitigação é direta: **Nunca confie no input do cliente para decisões de autorização.**

A lógica do backend deve sempre vincular o objeto solicitado ao usuário logado no momento (extraído de forma segura do token da sessão, não dos parâmetros da URL).

```javascript
// Exemplo RUIM (Vulnerável a BOLA)
app.get('/api/users/:id', (req, res) => {
    const user = db.find({ id: req.params.id }); // Pega o ID direto da URL!
    return res.json(user);
});

// Exemplo BOM (Seguro)
app.get('/api/users/:id', (req, res) => {
    const targetId = req.params.id;
    const loggedInUser = req.user.id; // Vem do middleware de Auth seguro
    
    // Verifica se o usuário tem permissão
    if (targetId !== loggedInUser && !req.user.isAdmin) {
        return res.status(403).send("Acesso Negado");
    }
    
    const user = db.find({ id: targetId });
    return res.json(user);
});
```

A autorização contínua é a base de uma API segura.
